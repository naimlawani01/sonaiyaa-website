# Sonaiyaa Site Vitrine

"Marketing" presentation landing page for Sonaiyaa, focused on acquiring partner businesses and new drivers (incentivizing app downloads).

## Status
- **Live in production** on **Vercel** at `https://sonaiyaa.fr` (and `sonaiyaa.com`). DNS + SSL handled by Vercel.
- A `Dockerfile` (Nginx) is also kept in this directory for portability (any container host) but Vercel is the production target.
- The store download CTAs (`href="#"` × 4 in `index.html`) still need real App Store / Google Play URLs once the apps are published.

## Tech Stack
- **Technologies**: HTML5, CSS3, JavaScript.
- **Approach**: Pure "Vanilla". No heavy frameworks or Tailwind.
- **Design System**: Custom, driven by CSS variables (`:root`).

## File Structure
- `index.html`: The semantic structure of the page (Hero, Stats, Features, CTA sections).
- `style.css`: The design system, including responsive design (media queries) and visual effects (glassmorphism, gradients).
- `script.js`: Dynamic animations, mobile burger menu, scroll effects (Intersection Observer), and animated counters.
- `img/`: Site visuals (phone mockups, hero, OG preview).
- `img/branding/`: Sonaiyaa logo SVGs/PNGs (mini, mark, full) — viewBoxes already tightened.
- `favicon.svg` + `favicon-*.png` + `apple-touch-icon.png`: brand icons at the root, referenced from `index.html`.
- `img/og-preview.png` (1200×630): white logo on Sonaiyaa orange — used for WhatsApp / Facebook / Twitter share cards.
- `img/logo.png`: horizontal logotype used in JSON-LD `Organization.logo`.

## Specific Rules
- **Performance & Lightweight**: Do not introduce heavy external libraries like jQuery, React, Bootstrap, or Tailwind.
- **Brand Consistency**: Maintain the organic design (blurred gradient shapes) and the "premium" aesthetic. Use the `Plus Jakarta Sans` font and the orange accent color `#FF5A1F`. The logo SVGs use `#D4410A` natively — do not change.
- **Logo in nav/footer**: nav and footer both use `img/branding/logo_full.svg` via `.nav__logo-full`. Footer applies `--invert` filter for the dark background.
- **Responsive Design**: Ensure any CSS modification adapts correctly on Mobile (<600px) and Tablet (<900px).
