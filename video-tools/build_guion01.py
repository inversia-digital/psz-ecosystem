#!/usr/bin/env python3
"""Genera el Guion 01 'El equipo invisible' — kinetic typography 9:16 premium."""
from moviepy import ImageClip, TextClip, CompositeVideoClip
from moviepy import vfx

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_L = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
W, H = 1080, 1920
BRASS = "#CBA363"
WHITE = "#ECE8DE"
DUR = 24

bg = (ImageClip("assets_bg.png")
      .with_duration(DUR)
      .with_effects([vfx.Resize(lambda t: 1.0 + 0.05 * t / DUR)])  # ken-burns lento
      .with_position("center"))


def txt(text, size, color, font=FONT, spacing=None):
    return TextClip(text=text, font=font, font_size=size, color=color,
                    stroke_color="black", stroke_width=1,
                    text_align="center", method="caption", size=(W - 160, None),
                    interline=8)


def beat(kicker, big, big_color, start, dur, y=760, kicker_color=WHITE):
    """Un beat = línea pequeña (kicker) + palabra grande, con fades."""
    clips = []
    fx = [vfx.CrossFadeIn(0.45), vfx.CrossFadeOut(0.45)]
    if kicker:
        k = (txt(kicker, 54, kicker_color, font=FONT_L)
             .with_position(("center", y)).with_start(start).with_duration(dur)
             .with_effects(fx))
        clips.append(k)
    if big:
        b = (txt(big, 104, big_color)
             .with_position(("center", y + (120 if kicker else 0)))
             .with_start(start).with_duration(dur).with_effects(fx))
        clips.append(b)
    return clips


layers = [bg]
# 0-3.5  gancho
layers += beat("¿Qué pasa", "ANTES", BRASS, 0.3, 3.3, y=720)
layers += beat("de que veas una oportunidad?", "", WHITE, 0.3, 3.3, y=980, kicker_color=WHITE)
# 3.8-8.5  revelación
layers += beat("Ya trabajaron en ella", "7 personas", BRASS, 3.9, 4.4, y=720)
# 8.7-14  el equipo
layers += beat("", "Análisis", BRASS, 8.8, 1.3, y=860)
layers += beat("", "Hipoteca", BRASS, 10.0, 1.3, y=860)
layers += beat("", "Fiscalidad", BRASS, 11.2, 1.3, y=860)
layers += beat("", "Reforma", BRASS, 12.4, 1.4, y=860)
# 14-19.5  resultado
layers += beat("Tú solo tienes que", "DECIDIR", BRASS, 14.2, 4.6, y=720)
# 19.8-24  CTA
layers += beat("Descubre todas las oportunidades", "", WHITE, 19.9, 4.0, y=760)
url = (txt("activos.psz.es/escaparate", 58, BRASS)
       .with_position(("center", 900)).with_start(19.9).with_duration(4.0)
       .with_effects([vfx.CrossFadeIn(0.5)]))
layers.append(url)

final = CompositeVideoClip(layers, size=(W, H)).with_duration(DUR)
out = "output/guion01_equipo_invisible.mp4"
final.write_videofile(out, fps=30, codec="libx264", audio=False,
                      preset="medium", threads=4, logger=None)
print("LISTO ->", out)
