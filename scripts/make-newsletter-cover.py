#!/usr/bin/env python3
"""
Generate the cover art for a Board Brief issue.

Each issue's cover is a calendar page for its publish month, on Dark Tide with
the teal/gold glow treatment used by the site's dark heroes. The publish date is
ringed in Coastal Gold. There is no per-issue photography, so this is the
artwork: it is always on-brand, always correct for the month, and takes no
design time.

Two files are written per issue:
  newsletter-<slug>.jpg     1200x840  spotlight / archive card art
  og-newsletter-<slug>.jpg  1200x630  social card

Usage:
  python3 scripts/make-newsletter-cover.py --month 8 --year 2026 --issue 1 --day 4

Adding next month is one command with the new --month/--year/--issue/--day.
"""
import argparse, calendar, math, os

from PIL import Image, ImageDraw, ImageFont

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


def screen(base, top):
    """Screen blend: 1-(1-a)(1-b), matching the CSS mix-blend-mode: screen."""
    from PIL import ImageChops
    return ImageChops.screen(base, top)


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


def draw_cover(size, month, year, issue, day):
    w, h = size
    img = Image.new('RGB', (w, h), DARK)
    img = glow(img, w * 0.12, h * 0.20, max(w, h) * 0.85, TEAL, 0.32)
    img = glow(img, w * 0.88, h * 0.90, max(w, h) * 0.75, GOLD, 0.13)
    img = noise(img, 0.05)
    d = ImageDraw.Draw(img)

    month_name = calendar.month_name[month]
    wide = h / w < 0.62  # the 1200x630 social card

    # ---- Masthead ------------------------------------------------------------
    pad = int(w * 0.075)
    y = int(h * (0.115 if wide else 0.10))
    eyebrow = font(int(w * 0.0165), 700)
    d.text((pad, y), 'T H E   B O A R D   B R I E F', font=eyebrow, fill=TEAL_100)
    y += int(w * 0.033)

    title = font(int(w * (0.062 if wide else 0.068)), 800)
    d.text((pad, y), month_name, font=title, fill=CREAM)
    tw = d.textlength(month_name, font=title)
    yr = font(int(w * (0.062 if wide else 0.068)), 300)
    d.text((pad + tw + int(w * 0.018), y), str(year), font=yr, fill=GOLD)

    y += int(w * (0.082 if wide else 0.090))
    d.line([(pad, y), (pad + int(w * 0.047), y)], fill=TEAL, width=max(3, int(w * 0.0033)))

    # ---- Calendar grid -------------------------------------------------------
    calendar.setfirstweekday(calendar.SUNDAY)
    weeks = calendar.monthcalendar(year, month)

    grid_top = y + int(w * (0.038 if wide else 0.050))
    cols, rows = 7, len(weeks)
    cell_w = (w - pad * 2) / cols
    avail = h - grid_top - int(h * (0.13 if wide else 0.115))
    cell_h = avail / (rows + 1)  # +1 row for the day-of-week header

    # Size glyphs off the smaller cell axis so the wide social card, whose rows
    # are much shorter, does not overlap.
    unit = min(cell_w, cell_h)
    dow = font(int(unit * 0.30), 700)
    for i, lbl in enumerate(['S', 'M', 'T', 'W', 'T', 'F', 'S']):
        cx = pad + cell_w * i + cell_w / 2
        bb = d.textbbox((0, 0), lbl, font=dow)
        d.text((cx - (bb[2] - bb[0]) / 2, grid_top), lbl, font=dow, fill=GOLD)

    num = font(int(unit * 0.44), 600)
    num_hi = font(int(unit * 0.44), 800)
    for r, week in enumerate(weeks):
        for c, dnum in enumerate(week):
            if dnum == 0:
                continue
            cx = pad + cell_w * c + cell_w / 2
            cy = grid_top + cell_h * (r + 1) + cell_h / 2
            s = str(dnum)
            hit = dnum == day
            f = num_hi if hit else num
            bb = d.textbbox((0, 0), s, font=f)
            if hit:
                rad = unit * 0.50
                d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=GOLD)
            d.text((cx - (bb[2] - bb[0]) / 2, cy - (bb[3] + bb[1]) / 2), s,
                   font=f, fill=DARK if hit else CREAM)

    # ---- Footer: issue number + send date -----------------------------------
    fy = h - int(h * (0.105 if wide else 0.088))
    meta = font(int(w * 0.0155), 700)
    d.text((pad, fy), f'ISSUE NO. {issue:02d}', font=meta, fill=CREAM)
    right = f'{month_name.upper()} {day}, {year}'
    d.text((w - pad - d.textlength(right, font=meta), fy), right, font=meta, fill=TEAL_100)
    return img


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--month', type=int, required=True)
    p.add_argument('--year', type=int, required=True)
    p.add_argument('--issue', type=int, required=True)
    p.add_argument('--day', type=int, required=True, help='send date, ringed in gold')
    a = p.parse_args()

    slug = f'{calendar.month_name[a.month].lower()}-{a.year}'
    os.makedirs(OUT, exist_ok=True)
    for dims, name, q in (((1200, 840), f'newsletter-{slug}.jpg', 84),
                          ((1200, 630), f'og-newsletter-{slug}.jpg', 84)):
        img = draw_cover(dims, a.month, a.year, a.issue, a.day)
        path = os.path.join(OUT, name)
        img.save(path, 'JPEG', quality=q, optimize=True, progressive=True)
        print(f'{name}  {dims[0]}x{dims[1]}  {os.path.getsize(path) // 1024}KB')


if __name__ == '__main__':
    main()
