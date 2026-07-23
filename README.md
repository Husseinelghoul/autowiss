# Auto Wiss

Marketing site for **Auto Wiss** — Autoankauf, Export & Verkauf in der Schweiz.
Swiss-German, static, built with [Astro](https://astro.build) and deployed to GitHub
Pages at [autowiss.ch](https://autowiss.ch).

## Structure

```
/
├── astro.config.mjs        # site URL, build.format:'file' (.html URLs), sitemap, astro-icon
├── public/                 # served verbatim
│   ├── CNAME               # autowiss.ch custom domain
│   ├── robots.txt
│   ├── js/site.js          # header, mobile menu, scroll-reveal, count-up, skeleton loader
│   └── img/                # photos, logos, favicon
├── src/
│   ├── layouts/Base.astro  # <head> (SEO/OG/JSON-LD), shared header + footer + WhatsApp float
│   ├── pages/
│   │   ├── index.astro     # homepage
│   │   ├── offerte.astro   # quote form → Formspree (noindex)
│   │   └── danke.astro     # thank-you page (noindex)
│   └── styles/wyss.css     # design system (tokens, typography, components)
└── .github/workflows/deploy.yml   # build + deploy to GitHub Pages
```

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # → dist/
npm run preview  # serve the production build
```

## Notes

- **Fonts** (Anton, Archivo) are self-hosted via Fontsource — no render-blocking Google
  Fonts request.
- **Icons** are Tabler, inlined as SVG at build time via `astro-icon` — no runtime JS/CDN.
- **Deploy** is automatic on push to `master` (GitHub Actions → Pages). The repo's
  *Settings → Pages → Source* must be set to **GitHub Actions**.
- The quote form posts to Formspree (`formspree.io/f/xeezdgln`); no backend required.
