# Phase 01 — Foundation

## Overview

Priority: high. Status: pending. Establish the new build and UI baseline without carrying legacy tooling forward.

## Requirements

- Configure Vite 8, React 19, TypeScript strict mode, Tailwind, shadcn/ui, React Router, Markdown rendering, and Prism.
- Move fixed public assets to `public/` while retaining root asset URLs.
- Configure linting, tests, aliases, and project scripts.

## Architecture

```
src/{app,common,components,features/{blog,cv},content,lib,styles}
public/{images,cv,fonts,favicon.ico}
```

## Implementation steps

1. Create the Vite TypeScript application and static asset structure.
2. Install and initialize Tailwind and shadcn/ui.
3. Add route shell, global styles, lint/test tooling, and import aliases.
4. Copy reusable assets only; exclude legacy JS/CSS from the bundle.

## Success criteria

- Development and production builds start successfully.
- shadcn/ui components render from local source.
- Existing image paths resolve from `/images` and `/cv/images`.

## Risks and security

- Tailwind must not be layered over legacy CSS wholesale; replace layout styles in scoped modules.
- No untrusted HTML is rendered at this stage.
