#!/usr/bin/env python3
"""Genera assets_bg.png — fondo cinematográfico premium 1080x1920
(base oscura + brillo radial en latón + viñeta + grano de cine).
Usado por build_guion01.py."""
from PIL import Image, ImageDraw, ImageFilter
import math
import random

W, H = 1080, 1920
img = Image.new("RGB", (W, H), (15, 18, 21))
px = img.load()
cx, cy = W * 0.5, H * 0.30
maxd = math.hypot(W, H)
for y in range(H):
    for x in range(0, W, 2):
        d = math.hypot(x - cx, y - cy) / maxd
        glow = max(0, 1 - d * 2.4)
        r = 15 + glow * 70
        g = 18 + glow * 52
        b = 21 + glow * 18
        dv = math.hypot(x - W / 2, y - H / 2) / maxd
        vig = max(0, 1 - dv * 1.15)
        r *= 0.55 + 0.45 * vig
        g *= 0.55 + 0.45 * vig
        b *= 0.55 + 0.45 * vig
        px[x, y] = (int(r), int(g), int(b))
        if x + 1 < W:
            px[x + 1, y] = (int(r), int(g), int(b))
img = img.filter(ImageFilter.GaussianBlur(2))
d = ImageDraw.Draw(img)
random.seed(7)
for _ in range(45000):
    x = random.randint(0, W - 1)
    y = random.randint(0, H - 1)
    n = random.randint(-8, 8)
    r, g, b = img.getpixel((x, y))
    d.point((x, y), (max(0, min(255, r + n)),
                     max(0, min(255, g + n)),
                     max(0, min(255, b + n))))
img.save("assets_bg.png")
print("assets_bg.png OK")
