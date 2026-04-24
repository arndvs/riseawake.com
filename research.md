# Research: Typography, Readability & Warmth Audit

Generated: 2026-04-23
Topic: Why RISE feels generic/cold despite updated colors — deep comparison with AI Hero and Rize Home

## Summary

The RISE site's readability and "warmth" problems trace to three root causes, all visible when compared side-by-side with AI Hero (aihero.dev) and the real Rize Home (rizehome.com):

1. **Body text is too small.** 163 instances of `text-sm` (14px) vs only 18 of `text-base` (16px). AI Hero uses 18px body with 32px line-height. Rize Home uses 17px body with ~30px line-height. RISE's descriptions, card bodies, and marketing copy are all crammed into 14px — uncomfortably small for a premium product site.

2. **No emphasis hierarchy in dark mode.** AI Hero's genius trick: body text is soft warm-gray (~85% lightness), but `<strong>` and headings are full white `rgb(255,255,255)`. Bold words literally *glow* against the softer background text. RISE currently has foreground at #F5F5F7 (nearly white) and relies solely on font-weight for emphasis — creating flat, monotone paragraphs with no visual rhythm.

3. **Cold neutrals.** RISE's secondary/muted colors (#6E6E73, #AEAEB2 light / #98989D, #636366 dark) are pure neutral grays — no warmth at all. Rize Home uses teal-tinted text (rgb(0,71,80)). AI Hero uses cool-blue tinted grays. Even a tiny hue shift makes text feel intentional rather than default.

## Architecture

### AI Hero Typography System (extracted via computed styles)
```
Font:        Inter (variable, system fallback)
Body:        18px / 32px (1.78 line-height ratio) / weight 400 / color ~#D0D4DA (lab 85%)
Strong:      18px / 32px / weight 600 / color #FFFFFF (full white — the emphasis trick)
H1:          51.2px / weight 700
H2:          30px / 40px / weight 700 / color #FFFFFF
H3:          24px / 36px / weight 600 / color #FFFFFF
Lists:       18px / 32px / 12px margin-bottom
Blockquote:  18px / 32px / weight 500
Article:     840px width, 32px horizontal padding (~776px content)
```

### AI Hero Color System (dark mode — their default)
```
Background:           lab(1.4%) ≈ #030303 (near-black)
Foreground (body):    lab(88.4%) ≈ #E0E0E0 (soft white — NOT pure white)
Strong/headings:      rgb(255,255,255) (FULL white — creates emphasis pop)
Muted foreground:     lab(72.8%) ≈ #B0B0B0
Card background:      lab(3.7%) ≈ #090909 (barely lighter)
Border:               lab(10.1%) ≈ #1A1A1A (very subtle)
Primary/accent:       warm golden/amber
```

### Rize Home Typography System
```
Font:        p22-mackinac-pro (serif headings) + brandon-grotesque (sans body)
Body:        17px / 29.75px (1.75 ratio) / weight 400 / color rgb(0,71,80) (teal-tinted!)
H2:          40px / 48px / weight 400 / serif
H3:          54px / 62px / weight 400 / serif
Nav:         16px / weight 400 / color rgb(0,71,80)
```

### RISE Current System
```
Font:        DM Serif Display (headings) + DM Sans (body)
Body:        16px base (1rem), but 163 instances of text-sm (14px!) used for body copy
Line-height: 1.6 base, leading-relaxed (1.625) on body text
Dark mode:
  Foreground:          #F5F5F7 (near-pure white — too bright for body)
  Foreground-secondary: #98989D (neutral gray — cold)
  Foreground-muted:    #636366 (neutral gray — cold)
Light mode:
  Foreground:          #1D1D1F (near-black — fine)
  Foreground-secondary: #6E6E73 (neutral gray — cold)
  Foreground-muted:    #AEAEB2 (neutral gray — cold)
```

## Constraints

- **DM Sans / DM Serif Display** are the brand fonts and must stay
- DM Sans renders well at 16-18px but gets thin/spidery at 14px (our most-used size)
- The RISE brand is playful/satirical — warmth should complement the tone, not fight it
- 163 instances of `text-sm` makes a bulk replacement risky without per-instance review — some are intentional (labels, captions, metadata) while others are body copy that should be larger
- Must maintain dark/light mode parity

## Open Questions

1. **Body text size: 16px (text-base) or 17px or 18px?** AI Hero and Rize both use 17-18px. For DM Sans, 17px (1.0625rem) might be the sweet spot — 18px risks feeling too large on card bodies.

2. **How far to warm the grays?** Options:
   - Subtle: add 1-2% warmth to the HSL (barely perceptible but removes "default" feel)
   - Moderate: tint toward the teal/coral accent hue
   - Aggressive: follow Rize Home's fully teal-tinted text (too branded for RISE?)

3. **Emphasis color: should bold text be brighter in dark mode?** AI Hero's approach (body = 85% lightness, bold = 100% white) is highly effective. For light mode, the inverse would be body = 90% lightness (dark gray), bold = pure black. This creates visual rhythm in paragraphs.

4. **Line-height: how generous?** Current 1.6 vs AI Hero's 1.78. Options: 1.65 (subtle), 1.7 (moderate), 1.75+ (generous). DM Sans with wider line-height feels more premium.

5. **Max content width enforcement?** AI Hero caps at ~776px. Our pages have `max-w-4xl` (896px) or `max-w-7xl` on some sections. Should we add a `prose-width` constraint?

## Recommendations

### Slice A: Body Text Size & Line-Height (AFK-safe)
Add a `text-body` token at 1.0625rem (17px) with 1.75 line-height. Bulk-replace the most egregious `text-sm` instances on marketing/body copy (NOT labels, metadata, or captions). This is the single highest-impact change.

**Token definition:**
```css
--text-body: 1.0625rem;
--text-body--line-height: 1.75;
--text-body--letter-spacing: normal;
```

### Slice B: Emphasis Hierarchy (AFK-safe)
In dark mode, soften `--foreground` from #F5F5F7 to #E8E8EC (warmer, slightly less bright). Keep headings and strong text at full brightness by adding a `--foreground-strong` token at #F5F5F7. In light mode, keep foreground at #1D1D1F but add `--foreground-strong` at #111111.

**Net effect:** Body text becomes softer and more readable, bold/heading text "pops" — exactly like AI Hero.

### Slice C: Warm the Grays (HITL — needs taste review)
Shift secondary/muted grays from pure neutral to slightly warm:

**Light mode proposals:**
```
--foreground-secondary: #6E6E73 → #6B6D6F (tiny cool-green tint toward teal)
--foreground-muted: #AEAEB2 → #A8AEAC (tiny teal warmth)
```

**Dark mode proposals:**
```
--foreground-secondary: #98989D → #959A98 (tiny green warmth)
--foreground-muted: #636366 → #5F6664 (tiny teal warmth)
```

These are subtle enough to not clash with the coral CTA but remove the "Tailwind default gray" feel.

### Slice D: Content Width & Paragraph Spacing
Add max-width constraint on body copy containers. Target: max-w-prose (65ch ≈ 700px) for long-form text, max-w-3xl (768px) for marketing copy.

### Priority Order
1. **Slice A** — body text size (biggest readability win, AFK-safe)
2. **Slice B** — emphasis hierarchy (biggest "feel" win, AFK-safe)
3. **Slice C** — warm grays (HITL — needs your eye)
4. **Slice D** — content width (minor, AFK-safe)
