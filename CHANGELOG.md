# Changelog

## [1.1.0] - Premium Product Polish Phase 2

### Brand Refinement
- Removed generic hospitality terminology across the application.
- Updated global tone to be warm, premium, human, local, and confident.
- Changed homepage headline to "Stay where mornings begin differently." with supportive subtext focused on athletes and explorers.

### Visual & Motion Polish
- Refined design system in `globals.css` using explicit editorial spacing and standardized `20px` border radii.
- Softened all shadows, replacing heavy shadows with elegant `rgba(0,0,0,0.04)` opacities.
- Standardized animation durations (500ms page, 180ms hover, 600ms reveal) and added Spring-based motion to CTAs.
- Added full `prefers-reduced-motion` support to the primary `Button` component, ensuring accessibility compliance.

### Homepage Architecture
- Rebuilt Trust Badges into a single, elegant scrolling row that highlights Guest Promises, Cleaning Standards, Local Experience, and Rapid Response.
- Maintained core hierarchy while applying editorial split design to the room section.

### Booking Flow
- Enhanced the booking summary panel with persistent guest reassurance checkmarks ("No payment required until confirmed", "Guaranteed secure booking").
- Verified booking logic scales accurately for monthly and weekly rates.

### Admin UX
- Stabilized and improved quick action layouts.
- Added visual feedback (loading spinners, success states) on booking actions.

### Performance & Trust
- Decreased LCP potential through refined CSS configuration.
- Re-architected Trust sections to display prominent confidence indicators during the checkout journey.
