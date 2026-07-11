#!/usr/bin/env python3
"""Guion 01 v2 — anuncio dirigido por PRODUCTO + DATOS (no texto sobre negro).
Muestra: mock del escaparate con oportunidades, 7 especialistas encendiéndose,
gráfico de cashflow animado y CTA. 9:16, 24 s, offline."""
import os
from PIL import Image, ImageDraw, ImageFont
from moviepy import (ImageClip, ImageSequenceClip, TextClip,
                     CompositeVideoClip, vfx)
import numpy as np

W, H = 1080, 1920
INK = (15, 18, 21)
CARD = (26, 30, 36)
CARD2 = (32, 37, 44)
LINE = (70, 66, 55)
BRASS = (203, 163, 99)
WHITE = (236, 232, 222)
MUTED = (150, 156, 162)
GREEN = (87, 185, 139)
FB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
os.makedirs("seq", exist_ok=True)


def F(sz, bold=True):
    return ImageFont.truetype(FB if bold else FR, sz)


def base():
    """Fondo cinematográfico (reutiliza assets_bg.png si existe)."""
    if os.path.exists("assets_bg.png"):
        return Image.open("assets_bg.png").convert("RGB").resize((W, H))
    return Image.new("RGB", (W, H), INK)


def rrect(d, box, r, fill=None, outline=None, width=2):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)


def center(d, y, text, font, fill, spacing=6):
    w = d.textlength(text, font=font)
    d.text(((W - w) / 2, y), text, font=font, fill=fill)
    return w


# ---------- ESCAPARATE (scene B) ----------
def deal_card(img, x, y, w, h, city, tipo, rent, cash):
    d = ImageDraw.Draw(img)
    rrect(d, [x, y, x + w, y + h], 22, fill=CARD, outline=(60, 66, 74), width=2)
    # barra de acento
    rrect(d, [x, y + 18, x + 8, y + h - 18], 4, fill=BRASS)
    pad = x + 34
    d.text((pad, y + 26), city, font=F(46), fill=WHITE)
    d.text((pad, y + 84), tipo, font=F(28, False), fill=MUTED)
    # tag analizada
    tag = "Analizada  ✓"
    tw = d.textlength(tag, font=F(24))
    rrect(d, [x + w - tw - 60, y + 30, x + w - 24, y + 74], 18,
          fill=(30, 46, 39), outline=(45, 80, 62), width=1)
    d.text((x + w - tw - 42, y + 38), tag, font=F(24), fill=GREEN)
    # metricas
    my = y + 150
    d.text((pad, my), "Rent. neta est.", font=F(24, False), fill=MUTED)
    d.text((pad, my + 30), rent, font=F(52), fill=BRASS)
    d.text((pad + 300, my), "Cashflow", font=F(24, False), fill=MUTED)
    d.text((pad + 300, my + 30), cash, font=F(52), fill=GREEN)


def escaparate_tall():
    th = 1500
    img = base().resize((W, th))
    # oscurecer un poco para legibilidad
    ov = Image.new("RGB", (W, th), INK)
    img = Image.blend(img, ov, 0.35)
    d = ImageDraw.Draw(img)
    d.text((70, 60), "Escaparate · Oportunidades", font=F(40), fill=WHITE)
    d.text((70, 112), "Ya analizadas por el equipo PSZ", font=F(26, False), fill=MUTED)
    cards = [
        ("Málaga", "Piso 2 hab · reforma incluida", "9,8 %", "+420 €/m"),
        ("Valencia", "Local reformado · alquilado", "8,4 %", "+510 €/m"),
        ("Sevilla", "Edificio · 3 unidades", "11,2 %", "+990 €/m"),
        ("Bilbao", "Piso céntrico · turístico", "9,1 %", "+460 €/m"),
    ]
    y = 190
    for c in cards:
        deal_card(img, 60, y, W - 120, 300, *c)
        y += 330
    return img


# ---------- 7 ESPECIALISTAS (scene C) ----------
ROLES = ["Analista", "Broker hipotecario", "Fiscalista", "Due Diligence",
         "Reformas", "Gestión del alquiler", "Estrategia"]


def specialists_frame(n_lit):
    img = base()
    d = ImageDraw.Draw(img)
    center(d, 300, "En cada oportunidad,", F(44, False), WHITE)
    center(d, 366, "7 especialistas", F(92), BRASS)
    y = 560
    for i, role in enumerate(ROLES):
        lit = i < n_lit
        w = 780
        x = (W - w) / 2
        fill = (34, 30, 22) if lit else CARD
        outl = BRASS if lit else (52, 57, 64)
        rrect(d, [x, y, x + w, y + 100], 20, fill=fill, outline=outl,
              width=3 if lit else 2)
        dot = BRASS if lit else (80, 86, 92)
        d.ellipse([x + 30, y + 40, x + 54, y + 64], fill=dot)
        d.text((x + 78, y + 30), role, font=F(40), fill=WHITE if lit else MUTED)
        if lit:
            d.text((x + w - 60, y + 30), "✓", font=F(40), fill=GREEN)
        y += 118
    return img


# ---------- GRÁFICO CASHFLOW (scene D) ----------
def chart_frame(k, total):
    img = base()
    d = ImageDraw.Draw(img)
    center(d, 260, "Tú ves el resultado.", F(44, False), WHITE)
    center(d, 326, "Nosotros hacemos los números.", F(40, False), MUTED)
    # contador rentabilidad
    val = 9.8 * min(1, k / max(1, total - 3))
    center(d, 470, f"{val:4.1f} %".replace(".", ","), F(150), BRASS)
    center(d, 660, "rentabilidad neta estimada", F(30, False), MUTED)
    # barras cashflow acumulado
    n = 12
    bx, by, bw = 120, 1500, (W - 240)
    d.line([bx, by, bx + bw, by], fill=(70, 76, 82), width=2)
    step = bw / n
    for i in range(n):
        grown = max(0, min(1, (k - i * (total / (n + 4))) / (total / 6)))
        bh = int(30 + i * 62) * grown
        x0 = bx + i * step + 8
        x1 = bx + (i + 1) * step - 8
        col = BRASS if i == n - 1 else (120, 100, 60)
        if bh > 2:
            rrect(d, [x0, by - bh, x1, by], 6, fill=col)
    center(d, 1540, "Cashflow acumulado · 12 meses", F(28, False), MUTED)
    return img


def seq(fn, frames, name):
    paths = []
    for i in range(frames):
        p = f"seq/{name}_{i:02d}.png"
        fn(i, frames).save(p)
        paths.append(p)
    return paths


print("Renderizando escenas…")
esc = escaparate_tall(); esc.save("seq/escaparate.png")
spec_paths = seq(lambda i, n: specialists_frame(i), 8, "spec")
chart_paths = seq(lambda i, n: chart_frame(i, n), 14, "chart")

# ---------- MONTAJE ----------
DUR = 24
bg = (ImageClip("assets_bg.png").with_duration(DUR)
      .with_effects([vfx.Resize(lambda t: 1.0 + 0.04 * t / DUR)]).with_position("center")) \
    if os.path.exists("assets_bg.png") else ImageClip(np.zeros((H, W, 3), np.uint8)).with_duration(DUR)


def txt(t, sz, color, font=FB):
    return TextClip(text=t, font=font, font_size=sz, color=f"rgb{color}",
                    stroke_color="black", stroke_width=1, method="caption",
                    text_align="center", size=(W - 160, None), interline=8)


layers = [bg]
cf = lambda a=0.4, b=0.4: [vfx.CrossFadeIn(a), vfx.CrossFadeOut(b)]

# A · gancho 0–3.4
layers.append(txt("¿Qué pasa antes de que veas", 50, WHITE, FR)
              .with_position(("center", 780)).with_start(0.2).with_duration(3.2).with_effects(cf()))
layers.append(txt("una oportunidad?", 78, BRASS)
              .with_position(("center", 900)).with_start(0.2).with_duration(3.2).with_effects(cf()))

# B · escaparate scroll 3.5–9.3
esc_clip = ImageClip("seq/escaparate.png")  # W x 1500
scroll_dur = 5.8
esc_clip = (esc_clip.with_start(3.5).with_duration(scroll_dur)
            .with_position(lambda t: ("center", 40 - (esc_clip.h - H + 80) * (t / scroll_dur)))
            .with_effects(cf(0.5, 0.4)))
layers.append(esc_clip)

# C · especialistas 9.3–14.2
spec_clip = (ImageSequenceClip(spec_paths, durations=[0.62] * len(spec_paths))
             .with_start(9.3).with_effects(cf(0.4, 0.4)))
layers.append(spec_clip)

# D · gráfico 14.2–19.6
chart_clip = (ImageSequenceClip(chart_paths, durations=[0.38] * len(chart_paths))
              .with_start(14.2).with_effects(cf(0.4, 0.4)))
layers.append(chart_clip)

# E · CTA 19.6–24
layers.append(txt("Descubre todas las oportunidades", 52, WHITE, FR)
              .with_position(("center", 760)).with_start(19.7).with_duration(4.1).with_effects(cf(0.5, 0.3)))
layers.append(txt("activos.psz.es/escaparate", 60, BRASS)
              .with_position(("center", 900)).with_start(19.7).with_duration(4.1).with_effects(cf(0.5, 0.3)))

final = CompositeVideoClip(layers, size=(W, H)).with_duration(DUR)
out = "output/guion01_v2.mp4"
final.write_videofile(out, fps=30, codec="libx264", audio=False,
                      preset="medium", threads=4, logger=None)
print("LISTO ->", out)
