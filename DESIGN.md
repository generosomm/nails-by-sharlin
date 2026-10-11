# Sharline light studio redesign

Direction: adapt the portfolio's oversized layered lettering and sculptural hero to Sharline's nail services. Keep one memorable composition rather than a side-by-side template. Light mode, plum branding, real services and Facebook-first inquiry.

Tokens: canvas #fcfafd, white #ffffff, plum #57334f, ink #302333, muted #6b5f70, lavender #eee8f1. Clash Display 600 for large sculptural headings; Satoshi 400/700 for readable controls and body. Both self-hosted with swap and system fallbacks.

Layout:
Header: signature left, navigation right.
Hero: small location line, oversized layered title + glossy nail fan, then action and interactive shade bar.
Services: quiet introduction left, price menu right. Stacks on mobile.
Contact: lavender studio panel, visit details left and accessible native inquiry controls right.

Critique: oversized lettering and overlapping glossy nails carry the identity. Remove repeated decorative cards and animated entrances. Use a single palette and control vocabulary. Preserve the same composition on mobile with reduced scale and natural wrapping. No heavy 3D runtime or per-frame JavaScript.

Color cycling: 3-second cycle, 1.2-second opacity crossfade; pause/play, manual selection pause, hidden-tab/offscreen pause and reduced-motion support. Hero and booking selections synchronize, autoplay never changes the inquiry.

Navigation: persistent light header with Services and Let’s talk; active section underline and aria-current on the home logo or section link. Header height sets anchor clearance. Passive scroll updates batch into one animation frame only while scrolling.

Hero refinement: live desktop now uses the compact thumbnail composition, with smaller nails and tighter type spacing. Mobile places the headline above the sculpture. Thumbnail capture uses production hero styling without alternate layout overrides.
