# Phase 06 — Verification

## Overview

Priority: high. Status: pending. Prove the migrated site is complete and visually functional.

## Requirements

- Test content inventory, routes, Markdown rendering, CV locale behavior, and no-jQuery dependency rule.
- Run lint, unit tests, production build, and browser smoke checks.

## Implementation steps

1. Add tests for content loader, route aliases, Markdown embeds, and locale data.
2. Run lint, tests, and build after each major phase.
3. Compare representative desktop/mobile pages from each category and both CV locales.
4. Request reviewer inspection and reconcile findings.

## Success criteria

- All checks pass without test bypasses or fake fixtures.
- Direct visits to every legacy content route render the corresponding page.
