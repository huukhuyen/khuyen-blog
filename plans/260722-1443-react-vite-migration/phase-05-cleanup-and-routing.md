# Phase 05 — Cleanup and Routing

## Overview

Priority: high. Status: pending. Make the new app the sole runtime and prevent broken historic links.

## Requirements

- Route `/`, listings, category indexes, all legacy article `.html` paths, `/cv`, and `/cv/en`.
- Add host rewrite configuration for SPA fallback.
- Remove static HTML, jQuery, skel, legacy CSS/plugin files only after equivalent pages pass validation.

## Implementation steps

1. Add React Router compatibility paths and a not-found page.
2. Add Netlify SPA redirect configuration if Netlify remains the host.
3. Audit internal links and root-relative asset references.
4. Delete replaced legacy source after the new production build succeeds.

## Risk assessment

- Validate static-host fallback before deletion; direct navigation to `.html` URLs is mandatory.
