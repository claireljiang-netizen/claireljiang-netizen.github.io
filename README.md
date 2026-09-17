# Claire Jiang — Portfolio

A static, GitHub Pages–ready portfolio site: product management case studies + an art gallery.
No build step, no framework — just HTML/CSS/JS.

## Structure

```
index.html                     Home page (About, Case Studies grid, Art gallery, Contact)
styles.css                     All styling (colors, layout, animations)
script.js                      Nav, scroll-reveal, art filters + lightbox, back-to-top
case-studies/
  uber-eats.html
  depop.html
  framer.html
  tendium.html
assets/
  art/                         Your artwork lives here (currently placeholder SVGs)
  case-studies/                Downloadable PDF decks linked from each case study page
```

## Preview locally

No server needed — just open `index.html` in a browser. Or, for a local server:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Source → Deploy from branch → `main` / `root`**.
Your site will be live at `https://<your-username>.github.io/<your-repo>/`
(or `https://<your-username>.github.io/` if the repo is named `<your-username>.github.io`).

## Adding your own art

1. Drop your image files into `assets/art/` (JPG/PNG/WebP all work — export at roughly 1200px on
   the long edge so pages load fast).
2. In `index.html`, find the `<div class="art-masonry">` block. Each piece is one `<figure>`:

```html
<figure class="art-tile" data-category="sketch" data-lightbox data-caption="Title of the piece">
  <img src="assets/art/your-file.jpg" alt="Short description of the piece" loading="lazy">
  <figcaption><span>Title of the piece</span><span class="cat">Sketch</span></figcaption>
</figure>
```

- Remove the `placeholder` class once you swap in a real image.
- `data-category` controls the filter buttons — use `sketch`, `painting`, or `digital` (or add
  your own category + a matching filter button in the `.art-filters` block).
- Copy/paste the `<figure>` block to add more pieces — the masonry layout and lightbox work with
  any number of tiles automatically.

## Before you share this

- [ ] Update the `LinkedIn` and `GitHub` links in the **Contact** section of `index.html` (currently placeholders).
- [ ] Swap the placeholder art tiles for real artwork (see above).
- [ ] Optional: add a `resume.pdf` to `assets/` and wire up a "Download Resume" button in the hero if you'd like one.
- [ ] Double check the Tendium and Framer write-ups reflect your work accurately — their source decks had less machine-readable text, so those pages lean more on your own project description than the original slides.

## Credits

Layout structure inspired by [sharon-jlee.github.io](https://sharon-jlee.github.io/).
Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) &amp; [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts.
