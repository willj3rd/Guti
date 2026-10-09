# Gutiérrez Landscaping & More

A responsive homepage built with Next.js, React, TypeScript, and self-hosted Manrope. Includes verified tap-to-call contacts, confirmed services, a text-message estimate flow, future before/after project sliders, optional authentic reviews, and hero-video support with responsive stills.

## View the website without hosting

```sh
npm run preview
```

Open `preview/Gutierrez-Website.html` in Chrome, Edge, Firefox, or Safari. This is a self-contained interactive copy of the actual application components, with images, fonts, and scripts embedded. It works offline without Node.js or a server. The mobile menu, estimate preview, phone/text links, and privacy page work. Sending a text still requires your messaging app. Rebuild the file after changing the website.

Cloud workspace processes stop when the environment restarts. A running server inside the workspace is not a public website address, and publishing the cloud environment does not deploy the website. For a permanent browser URL, deploy this Next.js project to a hosting provider such as Vercel or Netlify with the repository root set to this project directory.

## Development

Use the existing checkout at `/workspace/Guti`; cloud tasks are already isolated. A separate worktree is not needed.

Requires Node.js 22 or newer. This environment was validated with Node.js 24.

```sh
cd /workspace/Guti
npm ci --cache /workspace/.npm-cache
npm run dev
```

Production and validation:

```sh
npm run typecheck
npm run build
npm run start
npm test
```

The browser tests use `/usr/bin/chromium`. Set `CHROMIUM_PATH` to a different Chromium executable on another machine. Tests start an isolated production server on port 3100; build first and keep that port free. Stop the production server before rebuilding, so it does not serve stale asset references. The tests check contacts, asset loading, responsive layouts, keyboard navigation, form validation, SMS composition, clipboard copy, SEO routes, and automated WCAG AA accessibility.

## Editable business information

Edit `src/data/company.ts` for contacts, services, email, service area, logo/video paths, projects, reviews, and social links. Unverified optional fields stay empty and are hidden. Darwin's number is correctly labeled, and Will's number is retained.

The estimate form keeps details in the browser, prepares a request, and lets the visitor send it with their own messaging app. It does not send email, store leads, or report successful delivery. Desktop visitors can copy the request or call. Actual SMS delivery requires a messaging app and was not tested by sending a message.

## Before publishing

1. Verify the business email and service area before adding them.
2. Replace the provisional restored crest with the approved original digital logo. See `public/media/README.md` for asset provenance and replacement instructions.
3. Replace the clearly labeled illustrative hero artwork with approved photography/video when available.
4. Add only real projects and authentic customer reviews.
5. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin **before building**. This enables absolute Open Graph URLs, canonical URLs, and populated sitemap entries. The sitemap stays empty while the public domain is unknown rather than publishing an invented domain.

No deployment has been performed. The hosting provider should run `npm ci`, `npm run build`, and `npm run start` with the chosen port and public domain. No secrets are needed for the current text-message workflow.
