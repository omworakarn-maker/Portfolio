# Coffee Foundation interaction audit

This audit records public, observable design patterns for inspiration only. It is not a source-code or asset copy specification.

## Page and template map

| Template | Observable role | Reusable pattern |
| --- | --- | --- |
| Home | Editorial gateway to the movement, products, stories, and support | Asymmetrical card grid plus action strips |
| About / manifesto | Long-form purpose and statistics | Giant type, facts carousel, founder narratives, goal modules |
| Coffee / merch | Commercial catalogue and product detail | High-impact product media, option controls, cart entry |
| Take Five / support | Conversation and wellbeing prompts | Questions, progress-like response states, resource CTAs |
| Stories / partners | Community proof and partner profiles | Portrait-led editorial cards and rich profile sections |
| Utilities | Donation, account, cart, legal | Sticky navigation and overlay/drawer contexts |

## Visual tokens

- Base canvas: very pale blush/pink; solid black, saturated red, bubblegum pink, and occasional yellow/blue cards create the rhythm.
- Typography: sparse monospace navigation and utility text; oversized high-contrast editorial display lettering; tight negative tracking.
- Shape: generous 30–40px card radii, thin dark outlines, pill labels and buttons, simple hand-drawn/graphic marks.
- Composition: unaligned, magazine-like three-column card grid on desktop; short stacked cards and full-width featured panels on mobile.
- Media: full-bleed portraits, isolated product photography, long sprite/video moments, and minimal graphic overlays.

## Motion and interaction inventory

- Sticky navigation with rotating logo mark; desktop links take a text-shadow hover state.
- Full-screen menu reveals using `clip-path`; overlays support close controls and Escape dismissal.
- Clickable editorial cards use quick scale/saturation feedback; primary pills use a bouncy translate/scale easing.
- Repeating donation/CTA marquees run continuously; ambient media is muted and looping.
- Carousels and stat panels expose visible previous/next or indexed controls.
- Cart/login appear as contained utility contexts rather than separate visual systems.
- Fine-pointer devices use pointer affordances for links/cards; touch uses regular tap feedback and large targets.

## Accessibility requirements for the implementation

- Preserve semantic headings, links, buttons, dialog roles, focus visibility, and keyboard navigation.
- Menu/drawers close with Escape and have explicit close buttons.
- Honor `prefers-reduced-motion` and offer a persistent visible motion pause control.
- Decorative visual media receives no essential information; every state change has text feedback.

## Responsive behavior

- Desktop: sticky header, three-column editorial rhythm, large type, interactions on hover.
- Tablet: two-column grid with shorter hero cards and retained large type.
- Mobile: single-column card stack, minimum 44px controls, no reliance on custom cursor, and motion reduced when requested.
