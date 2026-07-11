# video-tools — Generador de promos verticales (TikTok / Reels / Shorts)

Herramientas para crear videos promocionales verticales (9:16, 1080×1920) a
partir de un video de fondo + textos superpuestos (gancho, cuerpo, CTA).
Pensado para promocionar el grupo de oportunidades inmobiliarias.

## Requisitos del entorno

- **Python 3.11+**
- **FFmpeg** (`sudo apt-get install ffmpeg`)
- **ImageMagick** (`sudo apt-get install imagemagick`)
- Paquetes de Python:
  ```bash
  python3 -m pip install --break-system-packages moviepy pillow numpy imageio-ffmpeg
  ```

## Uso

```bash
python3 promo_builder.py --video mi_clip.mp4 --config mi_config.json --out promo_final.mp4
```

- `--video` (opcional): tu clip de fondo. Se recorta automáticamente a 9:16.
  Si se omite, se usa un fondo de color sólido (`bg_color` del config).
- `--config` (requerido): archivo JSON con los textos y tiempos.
- `--out`: ruta del video final.

## Formato del config (JSON)

Ver `ejemplo_config.json`. Campos:

| Campo | Descripción |
|-------|-------------|
| `duration` | Duración total en segundos |
| `fps` | Fotogramas por segundo (30 recomendado) |
| `bg_color` | Color de fondo `[R,G,B]` si no hay video |
| `music` | Ruta a un mp3 de fondo (opcional) |
| `music_volume` | Volumen de la música (0.0–1.0) |
| `texts[]` | Lista de textos superpuestos |

Cada entrada de `texts[]`:

| Campo | Descripción |
|-------|-------------|
| `text` | Texto (admite `\n` y emojis) |
| `y` | Posición vertical en píxeles, o `"center"` |
| `font_size` | Tamaño de fuente |
| `color` | Color del texto (`"white"`, `"#FACC15"`, …) |
| `stroke_color` / `stroke_width` | Contorno para legibilidad |
| `start` / `duration` | Cuándo aparece y cuánto dura |
| `fade_in` / `fade_out` | Transiciones suaves (segundos) |

## Buenas prácticas para que sea viral en TikTok

1. **Gancho en los primeros 3 segundos** — la promesa más fuerte arriba.
2. **Texto grande y con contorno** — se lee en pantallas pequeñas.
3. **CTA claro al final** — "Únete al grupo 👇".
4. **9:16 vertical** — nunca horizontal.
5. **Música con tendencia** — añádela en la app (CapCut/TikTok) para usar
   audios populares del momento; el algoritmo los favorece.
