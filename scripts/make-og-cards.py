#!/usr/bin/env python3
"""
Generate a branded Open Graph card per page.

Before this, 41 of 45 pages shared /assets/og.png, so every share of every page
looked identical. Each card is Dark Tide with the site's teal/gold glow, the
page title set in Nunito Sans, and an eyebrow naming the section.

Usage:  python3 scripts/make-og-cards.py
Reads:  scripts/og-pages.json  [{slug, eyebrow, title}, ...]
Writes: public/assets/og/<slug>.jpg  at 1200x630
"""
import json, math, os, textwrap

from PIL import Image, ImageChops, ImageDraw, ImageFont

HERE = os.path.dirname(__file__)
FONT = os.path.join(HERE, 'assets', 'NunitoSans-Variable.ttf')
OUT = os.path.join(HERE, '..', 'public', 'assets', 'og')

DARK, CREAM, GOLD, TEAL, TEAL_100 = (23,35,37), (254,252,248), (191,172,95), (58,146,166), (199,224,229)


def font(size, weight=800):
    f = ImageFont.truetype(FONT, size)
    f.set_variation_by_axes([weight, 100, 12, 500])
    return f


def screen(base, top):
    return ImageChops.screen(base, top)


def glow(img, cx, cy, radius, rgb, peak):
    w, h = img.size
    layer = Image.new('RGB', (w, h), (0, 0, 0)); px = layer.load()
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            d = math.hypot(x - cx, y - cy) / radius
            if d >= 1.0: continue
            f = (1.0 - d) ** 2 * peak
            v = (int(rgb[0]*f), int(rgb[1]*f), int(rgb[2]*f))
            for dy in range(2):
                for dx in range(2):
                    if x+dx < w and y+dy < h: px[x+dx, y+dy] = v
    return screen(img, layer)


def noise(img, opacity=0.05):
    import random
    rnd = random.Random(4)          # fixed seed: no churn in git between runs
    w, h = img.size
    l = Image.new('L', (w//2+1, h//2+1))
    l.putdata([rnd.randint(0,255) for _ in range(l.size[0]*l.size[1])])
    l = l.resize((w,h), Image.NEAREST).point(lambda v: int(v*opacity))
    return screen(img, Image.merge('RGB', (l,l,l)))


def card(eyebrow, title):
    W, H = 1200, 630
    img = Image.new('RGB', (W, H), DARK)
    img = glow(img, W*0.12, H*0.20, max(W,H)*0.85, TEAL, 0.32)
    img = glow(img, W*0.88, H*0.90, max(W,H)*0.75, GOLD, 0.13)
    img = noise(img)
    d = ImageDraw.Draw(img)
    pad = 78

    d.text((pad, 74), ' '.join(eyebrow.upper()), font=font(19, 700), fill=TEAL_100)

    # Shrink until the headline fits three lines.
    for size in (62, 56, 50, 44, 39):
        f = font(size, 800)
        wrap = max(18, int(W * 1.85 / size))
        lines = textwrap.wrap(title, wrap)[:3]
        if len(lines) <= 3 and all(d.textlength(l, font=f) < W - pad*2 for l in lines):
            break
    y = 150
    for line in lines:
        d.text((pad, y), line, font=f, fill=CREAM)
        y += int(size * 1.18)

    d.line([(pad, H-132), (pad+64, H-132)], fill=TEAL, width=4)
    d.text((pad, H-108), 'TIDEWATER', font=font(25, 800), fill=CREAM)
    tw = d.textlength('TIDEWATER', font=font(25, 800))
    d.text((pad+tw+14, H-103), 'PROPERTY MANAGEMENT', font=font(15, 600), fill=TEAL_100)
    right = 'AAMC® · FAMILY-OWNED SINCE 1989'
    d.text((W-pad-d.textlength(right, font=font(15, 700)), H-101), right, font=font(15, 700), fill=GOLD)
    return img


def main():
    os.makedirs(OUT, exist_ok=True)
    pages = json.load(open(os.path.join(HERE, 'og-pages.json')))
    for p in pages:
        img = card(p['eyebrow'], p['title'])
        path = os.path.join(OUT, p['slug'] + '.jpg')
        img.save(path, 'JPEG', quality=82, optimize=True, progressive=True)
    print(f'{len(pages)} OG cards written to public/assets/og/')


if __name__ == '__main__':
    main()
