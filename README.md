# Remeni Rugs — B2B Wholesale Platform

A UX case study and front-end build for a wholesale rug supplier selling to independent
dealers and national retail partners.

**Role:** Sole designer and front-end developer
**Timeline:** Original concept 2021 (UT Dallas, ATEC) · Rebuilt 2026
**Stack:** HTML5, CSS3 (custom properties, grid), vanilla JavaScript, GitHub Pages
**Live site:** _add your GitHub Pages URL here_

> This is a concept project. Remeni Rugs is not a real company, and no real customer
> data was collected. Specifications shown are representative of the rug trade.

---

## The problem

Wholesale rug buying runs on specifications. A dealer quoting a client needs to know the
construction, fiber, pile height, knot density and country of origin before they can price
anything or promise a lead time.

Most supplier sites are built like consumer catalogs: large lifestyle photography, a
collection name, and nothing else. The specification lives in a PDF line sheet, or worse,
in a rep's inbox. That turns a thirty-second question into a next-day email thread.

**Design question:** what if the spec sheet *was* the catalog?

---

## Research

| Method | Scope | What it produced |
| --- | --- | --- |
| Competitive audit | _[N]_ supplier and marketplace sites | Spec data was buried in downloadable PDFs on most of them |
| User interviews | _[N]_ participants in dealer/buyer roles | Buyers filter by construction first, aesthetics second |
| Usability testing | _[N]_ participants, moderated, task-based | See findings below |

> **Fill in the participant counts.** Small numbers are normal and expected in
> qualitative research — five participants is a legitimate study. Vague is worse
> than small.

### Key findings

1. **Construction is the primary filter, not color.** Participants sorted by how a rug was
   made before they looked at pattern. The original design offered no way to do this.
2. **Buyers do not trust an unspecified rug.** When a listing lacked pile height or fiber,
   participants assumed the low-cost answer and moved on rather than asking.
3. **"Become a dealer" was read as a marketing form.** Nobody expected a reply. Stating
   the terms and response time up front changed how seriously it was taken.

---

## Design decisions

### The spec strip
Every collection card carries four specifications in monospace type, directly below the
name. This is the design's central idea: the data a buyer needs is on the card, not one
click and one PDF away.

### Filter by construction
Chips filter the grid by hand-knotted, flatweave, machine-woven, or hand-tufted, and the
search field matches fiber and origin as well as name. Result counts announce through an
`aria-live` region so the change is available to screen reader users.

### Honest dealer terms
The dealer section states the minimum first order, payment terms, freight threshold and
response time. Finding #3 said vagueness read as a brush-off.

### Material palette
Colors derive from traditional rug dyes — indigo, madder, ochre, walnut, undyed wool —
rather than a generic e-commerce palette. Typography pairs Fraunces (display) with Karla
(body) and IBM Plex Mono, which carries all specification data. Monospace signals "this is
measured" the way a spec sheet does.

---

## Accessibility

Built to WCAG 2.1 AA. Specifically:

- Skip link, semantic landmarks (`header` / `main` / `footer` / `nav`), one `h1` per page
- Descriptive `alt` text on every image, describing the rug rather than repeating the name
- Visible focus indicators on all interactive elements (3px, non-color-dependent)
- Zoom is not blocked — no `maximum-scale`
- Carousel does **not** auto-advance (WCAG 2.2.2); arrow-key operable, state announced
- Form errors are text, tied to inputs with `aria-describedby`, and move focus to the
  first invalid field
- `prefers-reduced-motion` respected
- Text contrast meets 4.5:1 against every background used

---

## What changed in the 2026 rebuild

The 2021 version was built on a Bootstrap theme. The rebuild replaced it for reasons that
were as much UX as engineering:

| Before | After |
| --- | --- |
| Bootstrap Creative theme, 11,533-line vendored CSS | Hand-written CSS, ~450 lines, custom properties |
| Windows backslash image paths — every image 404s on deploy | POSIX paths, verified |
| `alt="..."` on every image | Descriptive alt text throughout |
| `maximum-scale=1` blocked pinch-zoom | Zoom enabled |
| Auto-advancing 11-slide carousel, no pause | Manual, 4 slides, keyboard operable, state announced |
| Non-functional form, disabled submit | Client-side validation, error recovery, honest demo note |
| Category links pointed to a competitor's site | Internal navigation |
| No filtering — six cards, no way to narrow | Construction filters plus text search |
| Template name in `<title>` | Real metadata |

---

## Running locally

```bash
git clone https://github.com/<your-username>/remeni-rugs.git
cd remeni-rugs
python3 -m http.server 8000
# open http://localhost:8000
```

No build step and no dependencies.

### Deploying to GitHub Pages
Settings → Pages → Source: `main` branch, `/root`.

---

## Repository structure

```
.
├── index.html
├── css/styles.css
├── js/scripts.js
├── assets/
│   ├── favicon.ico
│   └── img/
│       ├── collection/     indie-poppy.jpg, jill-norma.jpg, lady-lilly.jpg,
│       │                   malibu.jpg, mono-design.jpg, zara-line.jpg
│       └── showrooms/      dallas.jpg, atlanta.jpg, high-point.jpg, las-vegas.jpg
└── README.md
```

**Images are not committed yet.** The CSS renders a woven placeholder pattern behind every
image slot, so the layout is correct before photography lands. Drop files in at the paths
above — the filenames in `index.html` are already lowercase and hyphenated.

---

## What I would do next

- Validate the spec strip against buyers who have never seen the site, to confirm four
  fields is the right number rather than an assumption
- Add sort by knot density and pile height — requested during testing, out of scope here
- Build the collection detail page: full size runs, lead times, and swatch ordering
- Instrument filter usage to check whether construction really is the primary axis at scale

---

## Credits

Design and development by [Melanie Mounthachak](https://www.linkedin.com/in/melanie-mounthachak/).
Concept project — not affiliated with any rug manufacturer or retailer named on the site.
