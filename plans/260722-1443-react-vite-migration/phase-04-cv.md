# Phase 04 — CV

## Overview

Priority: medium. Status: pending. Rebuild the Vietnamese and English CV from a common component tree.

## Requirements

- Support desktop panel switching and mobile stacked sections.
- Calculate age and experience from data; retain skill, testimonial, gallery, and contact interactions.
- Replace carousel/lightbox/scrollbar plugins with shadcn Carousel/Dialog and native scrolling.

## Implementation steps

1. Create locale data objects and shared CV section components.
2. Implement responsive navigation and panel/scroll behavior with React state and CSS.
3. Implement skill visuals, carousel, lightbox, and locale route switching.
4. Validate both `/cv` and `/cv/en`.

## Success criteria

- Both languages share components and differ only by data.
- No jQuery, Animate.css, Owl, Magnific Popup, or SlimScroll is shipped.
