#!/usr/bin/env python3
"""Anuncio 'Análisis firmado · SAX' — walkthrough del dossier real de PSZ.
Usa las páginas reales del dossier + datos reales, con la marca (navy+oro+serif)."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from moviepy import ImageClip, CompositeVideoClip, concatenate_videoclips, vfx
import numpy as np

W, H = 1080, 1920
NAVY = (14, 25, 47)
NAVY2 = (10, 18, 36)
GOLD = (201, 162, 75)
CREAM = (243, 239, 230)
MUTED = (150, 167, 190)
SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SANSB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
os.makedirs("sax_scenes", exist_ok=True)

P1 = Image.open("dossier_pages/p-1.png").convert("RGB")   # portada navy
P4 = Image.open("dossier_pages/p-4.png").convert("RGB")   # ROCE (cream)


def F(path, sz):
    return ImageFont.truetype(path, sz)


def wrap(d, text, font, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=font) <= maxw:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur:
        lines.append(cur)
    return lines


def center_text(d, y, text, font, fill, maxw=W - 160, lh=None):
    lines = wrap(d, text, font, maxw)
    lh = lh or (font.size + 14)
    for ln in lines:
        w = d.textlength(ln, font=font)
        d.text(((W - w) / 2, y), ln, font=font, fill=fill)
        y += lh
    return y


def kicker(d, y, text, font):
    """Etiqueta dorada centrada con tracking."""
    spaced = " ".join(text.upper())
    w = d.textlength(spaced, font=font)
    d.text(((W - w) / 2, y), spaced, font=font, fill=GOLD)


def scene_doc(crop_box, page, kick, caption, fname, highlight=None, pad_top=560):
    """Escena: recorte real del dossier sobre lienzo navy + kicker + caption."""
    canvas = Image.new("RGB", (W, H), NAVY)
    # glow sutil
    glow = Image.new("RGB", (W, H), NAVY)
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-200, -400, W + 200, 700], fill=(24, 40, 70))
    canvas = Image.blend(canvas, glow.filter(ImageFilter.GaussianBlur(160)), 0.6)
    d = ImageDraw.Draw(canvas)
    # recorte del dossier
    crop = page.crop(crop_box)
    cw = W - 120
    ch = int(crop.height * cw / crop.width)
    crop = crop.resize((cw, ch))
    # marco redondeado con borde dorado tenue
    card = Image.new("RGB", (cw + 24, ch + 24), (248, 246, 240))
    card.paste(crop, (12, 12))
    cx = (W - card.width) // 2
    canvas.paste(card, (cx, pad_top))
    d.rectangle([cx, pad_top, cx + card.width, pad_top + card.height],
                outline=GOLD, width=3)
    if highlight:
        hx0, hy0, hx1, hy1 = highlight
        d.rounded_rectangle([cx + 12 + hx0, pad_top + 12 + hy0,
                             cx + 12 + hx1, pad_top + 12 + hy1],
                            radius=14, outline=GOLD, width=6)
    # kicker + caption
    kicker(d, 300, kick, F(SANSB, 30))
    center_text(d, 360, caption, F(SERIF, 62), CREAM, lh=74)
    # footer
    fw = d.textlength("REF. PSZ-91CF-T · SAX", font=F(SANS, 26))
    d.text(((W - fw) / 2, H - 130), "REF. PSZ-91CF-T · SAX", font=F(SANS, 26), fill=MUTED)
    canvas.save(f"sax_scenes/{fname}.png")


def scene_card(kick, big, subs, fname, big_size=78):
    """Tarjeta navy pura (hook / CTA)."""
    canvas = Image.new("RGB", (W, H), NAVY)
    glow = Image.new("RGB", (W, H), NAVY)
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-100, 500, W + 100, 1500], fill=(28, 44, 74))
    canvas = Image.blend(canvas, glow.filter(ImageFilter.GaussianBlur(180)), 0.55)
    d = ImageDraw.Draw(canvas)
    # logo PSZ 360
    logo = "PSZ 360"
    lw = d.textlength(logo, font=F(SERIF, 44))
    d.text((W / 2 - lw / 2, 250), "PSZ ", font=F(SERIF, 44), fill=CREAM)
    d.text((W / 2 - lw / 2 + d.textlength("PSZ ", font=F(SERIF, 44)), 250),
           "360", font=F(SERIF, 44), fill=GOLD)
    if kick:
        kicker(d, 760, kick, F(SANSB, 30))
    y = center_text(d, 820, big, F(SERIF, big_size), CREAM, lh=big_size + 16)
    y += 30
    for s, col in subs:
        y = center_text(d, y, s, F(SANS, 40), col, lh=54)
        y += 18
    canvas.save(f"sax_scenes/{fname}.png")


print("Renderizando escenas con material real…")
# 1 · HOOK
scene_card("Dossier de inversión", "¿Qué hay detrás\nde una inversión\nrentable?",
           [], "s1_hook", big_size=84)
# 2 · ACTIVO (portada real)
scene_doc((70, 300, 1180, 470), P1, "01 · El activo",
          "88 m², comprado un 60 % por debajo de zona",
          "s2_activo", pad_top=640)
# 3 · RENTABILIDAD (banda 3 escenarios real)
scene_doc((75, 690, 1170, 985), P1, "02 · Rentabilidad",
          "9,5 % neta. Sin humo.",
          "s3_rent", highlight=None, pad_top=640)
# 4 · ROCE (gráfico real)
scene_doc((80, 440, 1170, 910), P4, "03 · Financiación",
          "Financiada, el ROCE llega al 106 %",
          "s4_roce", pad_top=620)
# 5 · PILARES (real)
scene_doc((70, 1385, 1180, 1560), P1, "El equipo PSZ 360",
          "Cinco especialistas. Un análisis firmado.",
          "s5_pilares", pad_top=700)
# 6 · CTA
scene_card("Análisis firmado · Toño Palacios",
           "Descubre todas\nlas oportunidades",
           [("activos.psz.es/escaparate", GOLD),
            ("Únete al canal de Telegram", CREAM)],
           "s6_cta", big_size=76)

# ---------- MONTAJE con Ken-Burns + crossfades ----------
SCENES = [
    ("s1_hook", 3.2), ("s2_activo", 4.0), ("s3_rent", 4.6),
    ("s4_roce", 4.8), ("s5_pilares", 4.0), ("s6_cta", 4.8),
]
clips = []
for i, (name, dur) in enumerate(SCENES):
    c = (ImageClip(f"sax_scenes/{name}.png").with_duration(dur)
         .with_effects([vfx.Resize(lambda t, d=dur: 1.0 + 0.05 * t / d)]))
    c = c.with_effects([vfx.CrossFadeIn(0.5)]) if i else c
    clips.append(c)

final = concatenate_videoclips(clips, method="compose", padding=-0.5)
out = "output/sax_analisis_firmado.mp4"
final.write_videofile(out, fps=30, codec="libx264", audio=False,
                      preset="medium", threads=4, logger=None)
print("LISTO ->", out, "· dur", round(final.duration, 1), "s")
