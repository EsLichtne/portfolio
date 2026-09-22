---
version: alpha
name: Ksenia Shevelyova Portfolio
description: Visual identity for a Product Designer & Design Engineer portfolio — editorial precision, engineering clarity, light surfaces.
colors:
  bg-0: "#ffffff"
  bg-100: "#edeeef"
  border: "#c8c8c8"
  fg-text: "#222224"
  fg-subtext: "#969698"
  fg-primary: "#482cff"
typography:
  heading:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: -0.02em
  subheading:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: -0.02em
  body:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: -0.02em
  link:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: -0.02em
  number:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 700
    lineHeight: 56px
    letterSpacing: -0.02em
rounded:
  none: 0px
  full: 9999px
spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 48px
  section: 96px
  stack: 80px
  page-pad: 24px
  grid-gap: 16px
  header-height: 65px
  page-max: 1920px
components:
  link-default:
    textColor: "{colors.fg-text}"
    typography: "{typography.link}"
  link-accent:
    textColor: "{colors.fg-primary}"
    typography: "{typography.link}"
  section-heading:
    textColor: "{colors.fg-text}"
    typography: "{typography.heading}"
  section-heading-desc:
    textColor: "{colors.fg-text}"
    typography: "{typography.body}"
  section-dot:
    backgroundColor: "{colors.fg-text}"
    size: 8px
    rounded: "{rounded.full}"
  case-meta:
    textColor: "{colors.fg-text}"
    typography: "{typography.body}"
    padding: 12px
  case-cover:
    backgroundColor: "{colors.bg-100}"
    rounded: "{rounded.none}"
  principle-cell:
    textColor: "{colors.fg-text}"
    typography: "{typography.body}"
    padding: 24px
  principle-index:
    textColor: "{colors.fg-subtext}"
    typography: "{typography.body}"
  header:
    backgroundColor: "{colors.bg-0}"
    textColor: "{colors.fg-text}"
    height: 65px
  toc-item:
    textColor: "{colors.fg-text}"
    typography: "{typography.body}"
    padding: 8px
  surface-panel:
    backgroundColor: "{colors.bg-100}"
    textColor: "{colors.fg-text}"
    rounded: "{rounded.none}"
    padding: 24px
---

## Overview

Personal portfolio of **Ксения Шевелёва** — Product Designer & Design Engineer. The visual identity is **editorial-technical**: a light, high-clarity layout that reads like a precise product brief rather than a marketing landing page.

The brand personality is calm, competent, and systems-oriented. Hierarchy comes from typography roles and a strict three-column grid, not from cards, shadows, or decorative chrome. Body copy lives in monospace; titles and large numerals use Inter Bold — a deliberate split between “document” and “interface label.”

Emotional target: professional restraint with one sharp accent (Electric Indigo) reserved for navigation into deeper content. The first viewport should feel like one composed page — name, role, short summary — not a dashboard of widgets.

Source of truth in code: `css/tokens.css`, `css/typography.css`, `css/main.css`.

## Colors

A near-monochrome light palette with a single interaction accent.

- **fg-primary / Electric Indigo (#482cff):** Sole accent. Use for “read more” and other deep-link CTAs that advance into a case. Never as a page wash or large fill.
- **fg-text / Ink (#222224):** Primary text, headings, section dots, logo-adjacent marks.
- **fg-subtext / Soft Gray (#969698):** Roles, captions, indices (“01”), footer meta, secondary parts of compound titles.
- **bg-0 / Paper (#ffffff):** Page and header background.
- **bg-100 / Mist (#edeeef):** Image placeholders, muted panels, principle/callout fills when a quiet tonal field is needed.
- **border / Hairline (#c8c8c8):** 1px rules for header bottom, case meta bands, principle grid lines, TOC separators.

Names match `css/tokens.css` (`--fg-primary`, `--fg-text`, etc.). Do not introduce additional accent hues. Do not use dark-mode skins, glow, or purple→indigo gradient themes beyond `fg-primary`.

## Typography

Two families, five roles — keep the set small.

| Role | Family | Weight | Size / Line | Use |
| --- | --- | --- | --- | --- |
| **heading** | Inter | 700 | 16 / 24 | Name, section titles, case titles, principle titles |
| **subheading** | IBM Plex Mono | 700 | 16 / 24 | Role lines next to the name |
| **body** | IBM Plex Mono | 500 | 16 / 24 | All narrative copy, meta, TOC |
| **link** | IBM Plex Mono | 500 | 16 / 24 | Underlined links (`text-underline-position: from-font`) |
| **number** | Inter | 700 | 48 / 56 | Large stats / numerals only |

Letter-spacing is uniformly `-0.02em`. Prefer `text-wrap: balance` on headings and `pretty` on body. Hover on links: opacity `0.7` (no color shift unless the link is already accent).

Self-hosted fonts: `assets/fonts/inter-bold.woff2`, `ibm-medium.woff2`, `ibm-bold.woff2`. Do not swap in system UI stacks as the primary voice.

## Layout

Desktop composition is a **fixed three-column fluid grid** inside a max width of **1920px**, with **24px** page padding and **16px** column gutters.

- **Columns:** Many blocks map content as `1 | 2–3` (title / lead in col 1, body or media spanning 2–3) or full-width three-column meta rows.
- **Vertical rhythm:** Section gap **96px**, block gap **48px**, page stack **80px** below the fixed header. On narrower breakpoints, section/stack compress toward **64px**; horizontal padding may drop to **20px**.
- **Header:** Fixed, full bleed, height driven by **65px** token; bottom hairline only.
- **Case pages:** Sticky TOC in column 1; long-form content in columns 2–3. Hero cover is full-width of the content band (not an inset card).

Avoid card grids in the hero, floating badges, and multi-widget first viewports. One job per section: one heading, one short supporting line, then the content.

## Elevation & Depth

This system is **flat**. No drop shadows, no blur glass, no layered “floating” surfaces.

Depth and grouping come from:

1. **Hairline rules** (`1px solid border`) — header, case meta bands, principle grid.
2. **Tonal fields** — `bg-100` behind covers and quiet panels.
3. **Typography and grid alignment** — not elevation.

Case cover images default to **grayscale** and animate to color on hover / in-view (`filter` transition ~0.45s). That motion is the primary “presence” cue; keep motion sparse and purposeful. Respect `prefers-reduced-motion`.

## Shapes

Default shape language is **architectural sharpness**: `border-radius: 0` on media, panels, and layout blocks.

The only intentional round form is the **8×8px section dot** (`rounded.full`) beside section titles. Do not mix pill buttons, rounded media cards, or soft 12–16px radii into this portfolio unless a future token explicitly adds them.

Images use `overflow: clip` with fixed aspect ratios (case covers, portrait/landscape about photos) — edges stay square.

## Components

### Links

Default links inherit `fg-text` and underline. Accent links (`case__more` and equivalents) use **fg-primary**.

**Hover (state, not a separate component):** `opacity: 0.7` on the same link — no color swap, no weight change, no underline restyle. Apply to both `link-default` and `link-accent`.

### Section heading

Black 8px dot + Inter Bold label in column 1; optional IBM Plex Mono description spanning columns 2–3. Keep the dot as the sole non-typographic ornament in headings.

### Case block

Three-row grid: title + date; description + cover; full-width meta band with top/bottom hairlines. Cover sits on `bg-100`, square corners, grayscale→color interaction. Meta is three equal columns of body mono — no chips or pills.

### Principles grid

3×2 cell field with hairline cross rules drawn once on the grid (not per-card borders). Cells are open — not cards. Indices use `fg-subtext`; titles use heading.

### Header & footer

Header: logo left, nav links + language switch right, `bg-0` background, bottom `border`. Footer: name + muted role, copyright in `fg-subtext` — no heavy chrome.

### Case TOC

Sticky list of numbered items; active item gets the same underline treatment as links. No background fills on active state.

## Do's and Don'ts

- Do keep the three-column grid as the structural backbone on desktop.
- Do use `fg-primary` only for advancing CTAs / deep links — one accent job.
- Do prefer hairlines and muted fills over shadows or glass.
- Do keep typography to the five defined roles; don’t invent a third font family.
- Do treat case imagery as full-bleed within its grid span, not as inset rounded thumbnails.
- Don’t turn sections into card carousels, stat strips, or pill clusters.
- Don’t add purple gradient washes, glow, or dark-mode skins.
- Don’t use Inter for long body copy or IBM Plex Mono for large display numerals.
- Don’t introduce border-radius on media or panels (except the section dot).
- Don’t put secondary marketing blocks (schedules, address rows, promo chips) in the first viewport.
