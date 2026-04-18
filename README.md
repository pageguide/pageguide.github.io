# XWebAgent Showcase

Static project website for XWebAgent, a browser extension for grounded, verifiable, and user-controlled web assistance.

## Overview

This site presents XWebAgent as a research-style project page built with plain HTML, CSS, and JavaScript for easy GitHub Pages deployment.

XWebAgent supports three interaction modes:

- `Find`: highlights exact supporting evidence on webpages, PDFs, and images
- `Guide`: provides step-by-step task help while keeping the user in control
- `Hide`: suppresses distracting or irrelevant content with reversible controls

## Tech Stack

- `index.html`
- `styles.css`
- `script.js`

No framework or build step is required.

## Local Preview

From the repository root:

```bash
python -m http.server 4172
```

Then open `http://localhost:4172`.

## Deployment

This repository is intended for GitHub Pages. Since the site is fully static, pushing changes to `main` is sufficient when GitHub Pages is configured to serve from the repository root.

## Credits

- Project content: XWebAgent
- Website design inspiration: [Clarity Template](https://shikun.io/projects/clarity) by [Shikun Liu](https://shikun.io/)
