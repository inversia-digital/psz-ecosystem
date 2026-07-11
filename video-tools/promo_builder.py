#!/usr/bin/env python3
"""
promo_builder.py — Genera una promo vertical (9:16) estilo TikTok a partir de
un video de fondo + textos (gancho, cuerpo, CTA).

Uso:
    python3 promo_builder.py --video mi_clip.mp4 --config promo.json --out promo_final.mp4

El archivo de configuracion (JSON) define los textos y tiempos. Ver ejemplo_config.json.
Si no se pasa --video, usa un fondo de color solido.
"""
import argparse
import json
import os

from moviepy import (
    VideoFileClip, ColorClip, TextClip, CompositeVideoClip, AudioFileClip,
)
from moviepy import vfx, afx

FONT = os.environ.get("PROMO_FONT", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
W, H = 1080, 1920  # 9:16 TikTok / Reels


def make_text(spec, total_dur):
    """Construye un TextClip a partir de una entrada de config."""
    start = spec.get("start", 0)
    dur = spec.get("duration", total_dur - start)
    clip = TextClip(
        text=spec["text"],
        font=spec.get("font", FONT),
        font_size=spec.get("font_size", 72),
        color=spec.get("color", "white"),
        stroke_color=spec.get("stroke_color", "black"),
        stroke_width=spec.get("stroke_width", 4),
        text_align="center",
        method="caption",
        size=(W - spec.get("margin", 120), None),
    )
    pos_y = spec.get("y", "center")
    clip = clip.with_position(("center", pos_y)).with_start(start).with_duration(dur)
    # fade in/out suave
    fin = spec.get("fade_in", 0.3)
    fout = spec.get("fade_out", 0.3)
    effects = []
    if fin:
        effects.append(vfx.CrossFadeIn(fin))
    if fout:
        effects.append(vfx.CrossFadeOut(fout))
    if effects:
        clip = clip.with_effects(effects)
    return clip


def build(video_path, config, out_path):
    total = config.get("duration", 8)

    # --- Fondo: tu video recortado a 9:16, o color solido ---
    if video_path and os.path.exists(video_path):
        base = VideoFileClip(video_path)
        # recorta a la duracion deseada
        if base.duration > total:
            base = base.subclipped(0, total)
        else:
            total = base.duration
        # escala/recorta a 9:16 llenando el marco
        base = base.with_effects([vfx.Resize(height=H)])
        if base.w < W:
            base = base.with_effects([vfx.Resize(width=W)])
        base = base.with_effects([vfx.Crop(width=W, height=H, x_center=base.w / 2, y_center=base.h / 2)])
        base_audio = base.audio
    else:
        color = tuple(config.get("bg_color", [15, 23, 42]))
        base = ColorClip(size=(W, H), color=color, duration=total)
        base_audio = None

    layers = [base]
    for spec in config.get("texts", []):
        layers.append(make_text(spec, total))

    final = CompositeVideoClip(layers, size=(W, H)).with_duration(total)

    # --- Musica de fondo opcional ---
    music_path = config.get("music")
    if music_path and os.path.exists(music_path):
        music = AudioFileClip(music_path)
        if music.duration > total:
            music = music.subclipped(0, total)
        music = music.with_effects([afx.MultiplyVolume(config.get("music_volume", 0.25))])
        if base_audio is not None:
            from moviepy import CompositeAudioClip
            final = final.with_audio(CompositeAudioClip([base_audio, music]))
        else:
            final = final.with_audio(music)
    elif base_audio is not None:
        final = final.with_audio(base_audio)

    final.write_videofile(out_path, fps=config.get("fps", 30), codec="libx264",
                          audio_codec="aac", preset="medium", threads=4)
    print("LISTO ->", out_path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", help="Video de fondo (opcional)")
    ap.add_argument("--config", required=True, help="JSON con textos y tiempos")
    ap.add_argument("--out", default="promo_final.mp4")
    args = ap.parse_args()
    with open(args.config, encoding="utf-8") as f:
        config = json.load(f)
    build(args.video, config, args.out)


if __name__ == "__main__":
    main()
