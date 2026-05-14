"""
Genera prueba criptográfica de autoría con fecha cierta para el repo
completo, anclando el hash en la blockchain de Bitcoin vía OpenTimestamps.

Flujo:
  1. git archive HEAD → tarball del estado actual del repo
  2. SHA-256 del tarball
  3. ots stamp <tarball> → genera <tarball>.ots y manda el hash a
     los calendarios de OpenTimestamps (que luego lo incluyen en un
     bloque de Bitcoin)
  4. Guarda <commit>-<timestamp>.tar.gz.ots en proofs/
  5. Guarda <commit>-<timestamp>.info.txt con el commit, timestamp y SHA-256
  6. Borra el tarball (ocupa MB, no nos interesa conservarlo)

El fichero .ots resultante (5-10 KB) es la prueba forense. Con él más
el código original en cualquier momento futuro, se puede demostrar
ante un juez/perito que ese estado del repo existía en la fecha del
bloque de Bitcoin que incluye el ancla.

Verificación: `ots verify <file>.ots <file>` con el tarball regenerado
desde el mismo commit git.
"""
import datetime
import hashlib
import os
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PROOFS_DIR = REPO_ROOT / "proofs"
PROOFS_DIR.mkdir(exist_ok=True)


def run(cmd: list[str], **kw) -> subprocess.CompletedProcess:
    """Ejecuta comando y aborta si falla, mostrando stderr."""
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=REPO_ROOT, **kw)
    if result.returncode != 0:
        print(f"ERROR ejecutando {' '.join(cmd)}:", file=sys.stderr)
        print(result.stderr, file=sys.stderr)
        sys.exit(result.returncode)
    return result


def main():
    now = datetime.datetime.utcnow().strftime("%Y%m%d-%H%M%SZ")

    # Hash del commit actual (corto, para nombrar el fichero)
    commit_full = run(["git", "rev-parse", "HEAD"]).stdout.strip()
    commit_short = commit_full[:12]

    # 1. Crear tarball reproducible del HEAD
    tarball = PROOFS_DIR / f"_temp_{now}.tar.gz"
    print(f"[1/5] Generando tarball reproducible de HEAD ({commit_short})...")
    # --format=tar.gz directo es no reproducible por la cabecera gzip;
    # mejor: pipe a gzip -n (sin nombre/timestamp) para que el hash sea estable
    with open(tarball, "wb") as f:
        archive = subprocess.Popen(
            ["git", "archive", "--format=tar", "HEAD"],
            stdout=subprocess.PIPE,
            cwd=REPO_ROOT,
        )
        gzip = subprocess.Popen(["gzip", "-n"], stdin=archive.stdout, stdout=f)
        archive.stdout.close()
        gzip.communicate()
        archive.wait()
        if archive.returncode != 0 or gzip.returncode != 0:
            print("ERROR: fallo creando tarball", file=sys.stderr)
            sys.exit(1)

    # 2. SHA-256 del tarball (para registro forense)
    print("[2/5] Calculando SHA-256...")
    h = hashlib.sha256()
    with open(tarball, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    sha256 = h.hexdigest()
    print(f"      SHA-256: {sha256}")

    # 3. Stamp con OpenTimestamps
    print("[3/5] Anclando en Bitcoin vía OpenTimestamps (puede tardar ~5-30s)...")
    run(["ots", "stamp", str(tarball)])
    ots_temp = tarball.with_suffix(tarball.suffix + ".ots")
    if not ots_temp.exists():
        print(f"ERROR: no se generó {ots_temp}", file=sys.stderr)
        sys.exit(1)

    # 4. Renombrar a algo navegable
    final_ots = PROOFS_DIR / f"{now}-{commit_short}.tar.gz.ots"
    ots_temp.rename(final_ots)
    print(f"[4/5] Prueba forense guardada: {final_ots.relative_to(REPO_ROOT)}")

    # 5. Info file con datos legibles humanos
    info = PROOFS_DIR / f"{now}-{commit_short}.info.txt"
    info.write_text(
        "OpenTimestamps proof of authorship\n"
        "===================================\n\n"
        f"Repository: psz-ecosystem\n"
        f"Commit (full):   {commit_full}\n"
        f"Commit (short):  {commit_short}\n"
        f"Anchored (UTC):  {now}\n"
        f"SHA-256 (tar.gz of HEAD): {sha256}\n\n"
        f"Proof file: {final_ots.name}\n\n"
        "Verification:\n"
        "  1. Checkout exactly this commit:  git checkout " + commit_full + "\n"
        "  2. Regenerate the same tarball:   git archive --format=tar HEAD | gzip -n > repo.tar.gz\n"
        "  3. Verify the SHA-256 matches the one above.\n"
        "  4. Run: ots verify " + final_ots.name + " repo.tar.gz\n\n"
        "If the OTS proof is anchored in a Bitcoin block (typically after\n"
        "1-24 hours), `ots verify` confirms the cryptographic timestamp.\n"
        "Before that, the proof is 'pending' but still cryptographically\n"
        "committed at the calendar servers.\n\n"
        "Legal value: eIDAS-compatible (Reg. UE 910/2014) evidence of\n"
        "authorship date. Bitcoin's chain cannot be retroactively modified\n"
        "without rewriting thousands of subsequent blocks (computationally\n"
        "infeasible).\n",
        encoding="utf-8",
    )
    print(f"[5/5] Metadatos guardados: {info.relative_to(REPO_ROOT)}")

    # Limpiar tarball (pesa MB, no se conserva)
    tarball.unlink()
    print("\nOK. Anclaje completado.")


if __name__ == "__main__":
    main()
