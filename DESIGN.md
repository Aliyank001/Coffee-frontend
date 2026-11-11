# Signature experience design

The supplied five-second Glacé reference video shows a central oversized iced drink, ghosted background typography, layered floating ingredients, a textured dark stage, left product information and right drink selectors. Latte, chocolate and matcha states were inspected at different times in the reference. The implementation carries that composition into the Café Aroma identity without using the video as a non-interactive backdrop.

## Implementation

- Four live states: iced latte, dark cocoa, ceremonial matcha and sparkling citrus tea.
- Selecting a thumbnail updates the hero title, description, price, product art, atmosphere and ingredient styling.
- The order button adds that actual catalog item and opens the existing working bag.
- Default rotation is seven seconds. User selection pauses it; a labelled control resumes/pauses it. Reduced motion disables autoplay by default and disables continuous decorative animation.
- Keyboard arrows/Home/End switch drink selections. Native buttons remain tab-accessible.
- One transparent PNG contains four product images; CSS selects its relevant quarter. No embedded text is used for headings or buttons.
- Mobile uses a stacked composition: product information, drink, selectors. Other pages share dark surfaces; receipts and printed QR cards remain light for readability and scanning.

## Asset

Workspace asset: `assets/drink-flight.png`.
Generated with the built-in `image_gen` tool, transparent background enabled. The generated source was copied into the project; the original was retained.

## Final generation prompt

Create a production-ready transparent PNG product sprite sheet for a premium interactive cafe website. Wide 2:1 canvas, FOUR equal-width columns, each containing ONE full tall transparent takeaway cup, completely isolated on transparent alpha background with generous clear separation. All four cups use identical scale, perspective (slightly above eye level, front view), lighting, and bottom baseline. Four cups, left to right: 1 iced caramel espresso latte with swirling white milk and caramel brown coffee, whipped cream and two coffee beans; 2 dark chocolate iced mocha, chocolate milk swirls, whipped cream dusted cocoa and one dark chocolate square; 3 vivid ceremonial green matcha over white milk and ice, soft cream on top with a tiny green leaf; 4 sparkling amber orange iced tea with beautiful translucent ice and orange slices, one mint sprig. Hyperrealistic luxury beverage photography, tactile condensation droplets, clear plastic cups and flat transparent lids, polished studio rim lighting, natural realistic shadows confined to cups, no ground plane. Every full cup including top cream and bottom is completely visible, not cropped. Each cup centered at horizontal positions 12.5%, 37.5%, 62.5%, 87.5%; all cups at same vertical position. Cups fill most height with small padding. This is an asset sheet only: no typography, no logos, no frames, no labels, no backgrounds, no extra floating objects outside cups. True transparent background, never checkerboard.

## Verification limits

DOM interaction tests cover the flavour selector, keyboard switching, pause state and selected-drink-to-cart integration, alongside the existing checkout/QR/receipt tests. Final browser visual review and phone scan testing remain necessary because the authoring environment did not expose a usable browser automation surface.

## Story photograph update

Asset: `assets/cafe-interior.png`, generated with the built-in image generation tool (opaque background). Brief: photorealistic editorial café interior in landscape 4:3; walnut cabinetry, brown leather seating, stone espresso counter, brushed brass pendants, soft window daylight, subtle plants and warm amber light. Eye-level composition showing the counter and seating, no people, logos, signs, text or blank borders. The values strip beneath the hero was removed at the user’s request. The photo fills its frame with explicit inset positioning.

## Menu video reference

The second supplied video shows a warm tan coffee showcase, a black coffee bag centered between concise copy, oversized ghosted typography and layered floating beans. These cues are applied to a compact panel inside the menu. The existing dark signature-drink hero is unchanged. Customers can add the existing Double Espresso or jump directly to the full menu; the hot-coffee action applies the category filter. On mobile the copy, bag and notes stack; reduced-motion settings stop decorative motion.

Generated asset: `assets/house-blend.png`, built-in image generation, transparent background enabled.

Final prompt: Create one photorealistic premium coffee packaging product cutout on a truly transparent background. A single upright matte-black 250g resealable coffee bag, entire bag visible, centered with comfortable transparent margins, slightly angled three-quarter front view, strong tactile paper texture, folded top seam, soft studio light from upper left with warm caramel edge highlights. Tasteful cream typography on the bag: small top line 'CAFÉ AROMA', large central text 'HOUSE BLEND', small bottom text 'ESPRESSO ROAST · 250g'. Minimal elegant package design, small thin copper line details, no other objects, no coffee beans outside bag, no ground plane, no backdrop, no frames. Premium editorial coffee product photography suitable as the large central floating object in a website menu feature. Tall portrait composition, realistic proportions, high legibility, transparent alpha background.
