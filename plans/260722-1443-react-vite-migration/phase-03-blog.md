# Phase 03 — Blog

## Overview

Priority: high. Status: pending. Build reusable blog components and routes from Markdown data.

## Requirements

- Recreate listing, category, article, mobile menu, back-to-top, code highlighting, and responsive layout.
- Use shadcn Sheet, Button, and Card; use native lazy loading and CSS transitions.
- Deliberately omit SEO and the weather widget unless it is retained as an optional client widget.

## Architecture

`common` owns navigation/social/footer; `features/blog` owns layouts, post cards, content loader, Markdown renderer, and routes.

## Implementation steps

1. Add typed content loader and pagination helpers.
2. Build shared header, sidebar, footer, mobile Sheet, and hero components.
3. Build list/category/article pages and controlled iframe/Prism renderers.
4. Map legacy routes, including `.html` paths, to the same React pages.

## Success criteria

- Article lists derive from Markdown rather than duplicated HTML.
- No browser-global DOM manipulation or jQuery remains.
