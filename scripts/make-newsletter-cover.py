#!/usr/bin/env python3
"""
Generate the cover art for a Board Brief issue.

Each cover is the issue's masthead on Dark Tide with the teal/gold glow treatment
used by the site's dark heroes: the month and year, the issue's headline, and the
issue number. There is no per-issue photography, so this is the artwork — always
on-brand, no design time. The newsletter is monthly, so the month is the date:
earlier covers were a calendar page with the send day ringed, which read as
stale once the month had passed.

Two files are written per issue:
  newsletter-<slug>.jpg     1200x840  spotlight / archive card art
  og-newsletter-<slug>.jpg  1200x630  social card

Usage:
  python3 scripts/make-newsletter-cover.py --month 10 --year 2026 --issue 2 \
    --title "This is the month the plan becomes a vote."

Adding next month is one command with the new --month/--year/--issue/--title.
"""
import argparse, calendar, math, os, textwrap

from PIL import Image, ImageChops, ImageDraw, ImageFont

FONT = os.path.join(os.path.dirname(__file__), 'assets', 'NunitoSans-Variable.ttf')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')

# Brand tokens - do not introduce values that are not in colors_and_type.css.
DARK       = (23, 35, 37)
CREAM      = (254, 252, 248)
GOLD       = (191, 172, 95)
TEAL       = (58, 146, 166)
TEAL_100   = (199, 224, 229)
TEAL_600   = (36, 101, 116)


def font(size, weight=800):
    f = ImageFont.truetype(FONT, size)
    # Axes: Weight, Width, Optical size, YTLC
    f.set_variation_by_axes([weight, 100, 12, 500])
    return f


def screen(base, top):
    """Screen blend: 1-(1-a)(1-b), matching the CSS mix-blend-mode: screen."""
    return ImageChops.screen(base, top)


def glow(img, cx, cy, radius, rgb, peak):
    """Radial gradient, screen-blended - the same treatment as the dark heroes."""
    w, h = img.size
    layer = Image.new('RGB', (w, h), (0, 0, 0))
    px = layer.load()
    # Step 2px and fill 2x2 blocks; visually identical, ~4x faster.
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            d = math.hypot(x - cx, y - cy) / radius
            if d >= 1.0:
                continue
            f = (1.0 - d) ** 2 * peak
            v = (int(rgb[0] * f), int(rgb[1] * f), int(rgb[2] * f))
            for dy in range(2):
                for dx in range(2):
                    if x + dx < w and y + dy < h:
                        px[x + dx, y + dy] = v
    return screen(img, layer)


def noise(img, opacity=0.05):
    """Fine monochrome grain, screen-blended - the site's feTurbulence stand-in."""
    import random
    rnd = random.Random(4)  # fixed seed: same grain every run, no churn in git
    w, h = img.size
    cell = 2
    layer = Image.new('L', (w // cell + 1, h // cell + 1))
    layer.putdata([rnd.randint(0, 255) for _ in range(layer.size[0] * layer.size[1])])
    layer = layer.resize((w, h), Image.NEAREST).point(lambda v: int(v * opacity))
    return screen(img, Image.merge('RGB', (layer, layer, layer)))


def ghost_text(img, xy, text, f, rgb, strength):
    """Very faint type, screen-blended into the background - a watermark."""
    layer = Image.new('RGB', img.size, (0, 0, 0))
    ImageDraw.Draw(layer).text(xy, text, font=f, fill=tuple(int(c * strength) for c in rgb))
    return screen(img, layer)


def fit_lines(d, text, size_from, size_to, max_w, max_lines=3):
    """Shrink the headline until it wraps to max_lines within max_w."""
    for size in range(size_from, size_to - 1, -2):
        f = font(size, 800)
        # Start wide and tighten until every line fits the column.
        for width in range(40, 10, -1):
            lines = textwrap.wrap(text, width)
            if all(d.textlength(l, font=f) <= max_w for l in lines):
                break
        if len(lines) <= max_lines:
            return f, size, lines
    return f, size, lines[:max_lines]


def draw_cover(size, month, year, issue, title):
    w, h = size
    wide = h / w < 0.62  # the 1200x630 social card
    img = Image.new('RGB', (w, h), DARK)
    img = glow(img, w * 0.12, h * 0.20, max(w, h) * 0.85, TEAL, 0.32)
    img = glow(img, w * 0.88, h * 0.90, max(w, h) * 0.75, GOLD, 0.13)
    img = noise(img, 0.05)

    month_name = calendar.month_name[month]
    pad = int(w * 0.075)

    # ---- Watermark: the issue number, barely there, bottom right --------------
    ghost = font(int(h * (0.62 if wide else 0.52)), 800)
    gd = ImageDraw.Draw(img)
    gtxt = f'{issue:02d}'
    gb = gd.textbbox((0, 0), gtxt, font=ghost)
    gx = w - pad + int(w * 0.02) - (gb[2] - gb[0])
    gy = h - int(h * (0.09 if wide else 0.075)) - (gb[3] - gb[1]) - gb[1] + int(h * 0.02)
    img = ghost_text(img, (gx, gy), gtxt, ghost, GOLD, 0.09)

    d = ImageDraw.Draw(img)

    # ---- Masthead ------------------------------------------------------------
    y = int(h * (0.115 if wide else 0.10))
    eyebrow = font(int(w * 0.0165), 700)
    d.text((pad, y), 'T H E   B O A R D   B R I E F', font=eyebrow, fill=TEAL_100)
    y += int(w * 0.033)

    title_f = font(int(w * (0.062 if wide else 0.068)), 800)
    d.text((pad, y), month_name, font=title_f, fill=CREAM)
    tw = d.textlength(month_name, font=title_f)
    yr = font(int(w * (0.062 if wide else 0.068)), 300)
    d.text((pad + tw + int(w * 0.018), y), str(year), font=yr, fill=GOLD)

    y += int(w * (0.082 if wide else 0.090))
    d.line([(pad, y), (pad + int(w * 0.047), y)], fill=TEAL, width=max(3, int(w * 0.0033)))

    # ---- Headline ------------------------------------------------------------
    y += int(w * (0.036 if wide else 0.046))
    footer_y = h - int(h * (0.105 if wide else 0.088))
    max_w = w - pad * 2 - int(w * 0.08)
    f, size, lines = fit_lines(d, title, int(w * (0.050 if wide else 0.056)), int(w * 0.034), max_w)
    line_h = int(size * 1.16)
    # Never run into the footer, whatever the headline length.
    while y + line_h * len(lines) > footer_y - int(h * 0.05) and size > int(w * 0.034):
        f, size, lines = fit_lines(d, title, size - 2, int(w * 0.034), max_w)
        line_h = int(size * 1.16)
    for line in lines:
        d.text((pad, y), line, font=f, fill=CREAM)
        y += line_h

    # ---- Footer: issue number + publisher ------------------------------------
    meta = font(int(w * 0.0155), 700)
    d.text((pad, footer_y), f'ISSUE NO. {issue:02d}', font=meta, fill=CREAM)
    right = 'TIDEWATER PROPERTY MANAGEMENT'
    d.text((w - pad - d.textlength(right, font=meta), footer_y), right, font=meta, fill=TEAL_100)
    return img


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--month', type=int, required=True)
    p.add_argument('--year', type=int, required=True)
    p.add_argument('--issue', type=int, required=True)
    p.add_argument('--title', required=True, help="the issue's headline, sentence case, with its period")
    a = p.parse_args()

    slug = f'{calendar.month_name[a.month].lower()}-{a.year}'
    os.makedirs(OUT, exist_ok=True)
    for dims, name, q in (((1200, 840), f'newsletter-{slug}.jpg', 84),
                          ((1200, 630), f'og-newsletter-{slug}.jpg', 84)):
        img = draw_cover(dims, a.month, a.year, a.issue, a.title)
        path = os.path.join(OUT, name)
        img.save(path, 'JPEG', quality=q, optimize=True, progressive=True)
        print(f'{name}  {dims[0]}x{dims[1]}  {os.path.getsize(path) // 1024}KB')


if __name__ == '__main__':
    main()
