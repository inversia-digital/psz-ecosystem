# Pruebas forenses de autoría — OpenTimestamps

Cada commit en `main` genera automáticamente una prueba criptográfica con
fecha cierta anclada en la blockchain de Bitcoin vía OpenTimestamps
(eIDAS-compatible, Reglamento UE 910/2014).

## Qué hay en este directorio

Para cada commit anclado se generan **dos ficheros**:

- `YYYYMMDD-HHMMSSZ-<commit_short>.tar.gz.ots` — la prueba criptográfica
  (5-10 KB). Es lo que se presenta en juicio.
- `YYYYMMDD-HHMMSSZ-<commit_short>.info.txt` — metadatos legibles humanos:
  commit completo, SHA-256 del tarball, instrucciones de verificación.

## Cómo verificar una prueba

```bash
# 1. Checkout del commit exacto que se quiere verificar
git checkout <commit-completo-del-info.txt>

# 2. Regenerar el tarball reproducible
git archive --format=tar HEAD | gzip -n > repo.tar.gz

# 3. Comprobar que el SHA-256 coincide con el del .info.txt
sha256sum repo.tar.gz

# 4. Ejecutar la verificación de OpenTimestamps
ots verify <fichero>.tar.gz.ots repo.tar.gz
```

Si la prueba está anclada (típicamente tras 1-24 horas del push), `ots
verify` confirma el bloque de Bitcoin que contiene el ancla y la fecha
cierta.

Mientras tanto, la prueba está "pending" pero ya criptográficamente
comprometida en los servidores calendario de OpenTimestamps.

## Para qué sirve esto legalmente

Si alguien copia código de este repositorio y lo despliega en otro sitio:

1. Tomas su versión del código (con su fecha pública de aparición).
2. Encuentras el commit equivalente nuestro con fecha anterior.
3. Presentas el `.ots` correspondiente y el commit Git.
4. Un perito verifica la cadena de Bitcoin y certifica que ese estado
   del código existía en nuestro lado **antes** que en el suyo.

La blockchain de Bitcoin **no se puede modificar retroactivamente**
sin reescribir miles de bloques posteriores (imposible
computacionalmente). Por eso este tipo de prueba se considera
indiscutible en juicio.

## Mantenimiento

**Ninguno.** El GitHub Action `.github/workflows/timestamp.yml`
ejecuta el script automáticamente en cada push a main, genera la
prueba, hace commit y push del fichero `.ots` y `.info.txt` aquí.

Si quieres regenerar manualmente desde local:

```bash
pip install opentimestamps-client
python scripts/timestamp.py
```
