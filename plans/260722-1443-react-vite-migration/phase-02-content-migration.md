# Phase 02 — Content Migration

## Overview

Priority: high. Status: pending. Convert each article body into Markdown with typed frontmatter.

## Requirements

- Generate 26 files under `src/content/posts/{coding,nhung-dieu-dang-nho,suu-tam}`.
- Extract only `.description-post`; do not migrate shared chrome, metadata, or scripts.
- Normalize article-page dates to ISO; article pages override listing dates.

## Related code files

- Source: `coding/*.html`, `nhung-dieu-dang-nho/*.html`, `suu-tam/*.html`.
- Create: migration script, Markdown files, content validation test.

## Implementation steps

1. Build a deterministic conversion script using an HTML parser and Markdown serializer.
2. Generate frontmatter: title, slug, category, publishedAt, summary, featured image, legacy path, aliases, source, embeds.
3. Convert code fences, images, blockquotes, the GFM table, and internal links.
4. Store iframe URLs in frontmatter for an allowlisted renderer.
5. Assert expected article, code block, iframe, and table counts.

## Success criteria

- 15 coding, 6 life, and 5 curated articles are present.
- The orphaned curated post is included and the missing-extension URL is an alias.

## Risk assessment

- Preserve only known iframe sources; reject arbitrary iframe URLs in the renderer.
