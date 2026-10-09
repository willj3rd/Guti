# Website assets

- `gutierrez-crest.webp`: provisional AI-assisted restoration from the two supplied business-card photographs. It preserves the crest, mountains, trees, path, ribbon, green/red palette, and Mexican-inspired emblem. Replace with the original approved digital logo when available; this is not an exact vector extraction.
- `hero-lawn.webp` and `hero-lawn-mobile.webp`: generated illustrative landscape artwork for the initial layout. The website labels it as illustrative and not a client project. Replace with approved photography and set `company.hero.illustrative` appropriately.
- Future approved video: `hero-lawn.mp4`. Use a muted 5–8 second optimized MP4, then set `company.hero.video` to `/media/hero-lawn.mp4`. The still remains visible if playback fails. Mobile, reduced-motion, and detected slow/save-data connections use the still instead.

Generated source PNGs remain outside the checkout in `/workspace/generated_images` in this workspace. Only optimized WebP assets are served by the application. Fonts are self-hosted from `@fontsource/manrope` (SIL Open Font License).

Add real project images here, then populate `company.projects` with verified descriptions and locations. No sample projects or reviews are published.
