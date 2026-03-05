# Routes — My Dental Clinic

## Routing Type
Single-page application (SPA) — no router. All sections are on one page (`/`).

## Page Structure
```
/ (Landing Page)
Entry: src/App.tsx
Sections (all on same page, anchor-linked):
  - #hero (above fold)
  - #servicii → Services section
  - #despre → WhyUs section
  - #echipa → (referenced in nav, not yet implemented)
  - #contact → Contact + Form section
  - #programare → Contact form anchor
  - #programare-form → Contact form exact anchor
```

## Anchor Navigation
| Anchor | Component | Section |
|---|---|---|
| / (top) | Hero | Hero + StatsBar |
| #servicii | Services | 9-card services grid |
| #despre | WhyUs | Why choose us |
| #contact | Contact | Contact info + form |
| #programare | Contact | Appointment form |

## No Router Config
Uses plain `<a href="#anchor">` scroll navigation. No React Router installed.
