# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static landing page for Edenred Card (employee benefits payment card). No build step, no dependencies — plain HTML/CSS/JS served directly from the filesystem.

## Development

Open `index.html` directly in a browser:
```bash
open index.html
```

Convert images (TIF → PNG):
```bash
sips -s format png input.tif --out output.png
```

Convert video (MP4 → WebM):
```bash
/opt/homebrew/bin/ffmpeg -y -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an output.webm
```

Remove image background (AI):
```bash
python3 -c "from rembg import remove; from PIL import Image; out = remove(Image.open('in.png')); out.save('out.png')"
```

## Architecture

Three files:

- **`index.html`** — all content and structure. Sections in order: nav, hero, pain, how (steps + case study + circles), lead-magnet (guide mockup), features, numbers, card-break, contact, footer.
- **`style.css`** — all styles. Organised in the same top-to-bottom section order as the HTML. Uses CSS custom properties defined in `:root`.
- **`main.js`** — three behaviours: scroll reveal (IntersectionObserver), smooth anchor scrolling, number counter animation, and cursor-following gradient on `.guide-mockup__cover`.

## Brand

- **Primary red:** `#F72717`
- **Gradient Pink:** `#FF007D`
- **Brand gradient:** `linear-gradient(135deg, #F72717, #FF007D)` — used on the guide mockup cover
- **Font:** Edenred (OTF files in `assets/edenred-font [otf]/`), weights 300/400/500/700
- **Logo:** `assets/Edenred-logo/Color/Edenred_Digital-use.svg`

## Section backgrounds

Sections alternate strictly — never two adjacent sections with the same background:

| Section | Background |
|---|---|
| hero | white |
| pain | gray-100 |
| how | white |
| lead-magnet | gray-100 |
| features | white |
| numbers | gray-100 |
| card-break | white (+ `background_card_payment.png` with gradient overlay) |
| contact | gray-100 |
| footer | white |
