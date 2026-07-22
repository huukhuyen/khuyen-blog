# React + Vite Migration

## Goal

Replace the static HTML/jQuery site with React, Vite, TypeScript, Tailwind, and shadcn/ui. Migrate 26 articles to Markdown, retain assets/content, and omit SEO work.

## Phases

1. [ ] [Foundation](phase-01-foundation.md) — Vite, TypeScript, Tailwind, shadcn/ui, assets, linting.
2. [ ] [Content migration](phase-02-content-migration.md) — deterministic HTML-to-Markdown conversion and validation.
3. [ ] [Blog](phase-03-blog.md) — shared layout, routes, Markdown renderer, and responsive interactions.
4. [ ] [Curriculum vitae](phase-04-cv.md) — shared bilingual CV components and responsive behavior.
5. [ ] [Cleanup and routing](phase-05-cleanup-and-routing.md) — remove legacy sources/dependencies and preserve paths.
6. [ ] [Verification](phase-06-verification.md) — automated checks, visual smoke testing, review, and docs.

## Key decisions

- One React SPA with React Router; support current `.html` routes and the known no-extension alias.
- Markdown is the article source of truth; typed frontmatter drives categories and pagination.
- Use shadcn/ui primitives selectively: Sheet, Button, Card, Dialog, Carousel, and optional ScrollArea.
- Preserve five article iframes through an allowlisted embed component; render code with Prism.
- Keep visual intent and static assets; remove all jQuery, IE support, legacy plugins, and SEO metadata.

## Dependencies

Foundation precedes all coding. Content migration and shared blog/CV construction can then proceed independently. Cleanup follows route coverage. Verification gates delivery.

## Success criteria

- 26 Markdown files: coding 15, nhung-dieu-dang-nho 6, suu-tam 5.
- All current blog and CV paths render, including legacy `.html` post paths.
- No jQuery or legacy runtime/plugin files are included in the build.
- `npm run lint`, tests, and production build pass.
