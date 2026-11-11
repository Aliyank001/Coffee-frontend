# Café Aroma

A considered café experience built with HTML, CSS and JavaScript. A reference-led cinematic dark palette, Playfair Display and Poppins typography, transparent drink photography, floating ingredients and interactive flavour transitions frame a complete digital-menu portfolio demo.

## Run locally

Requirements: Python 3 for the development server; Node.js 20+ for build and tests.

```sh
npm run dev
```

Open http://127.0.0.1:4173. No runtime package installation is needed. Avoid opening HTML as file:// because browser storage and navigation work more reliably over HTTP.

```sh
npm install
npm test
npm run build
```

Deploy the generated `dist` directory to any static host. Only the customer HTML pages are published; the owner QR tool is excluded from the build. Relative asset URLs support subdirectory hosting. Keep the domain stable after printing QR codes.

## Experience

- **Signature hero:** four selectable drinks (latte, cocoa, matcha, citrus), matching scene colors, a large transparent product visual, animated ingredients, keyboard selection, optional automatic rotation and direct ordering. Reduced-motion settings disable automatic rotation by default.
- **Home / digital menu:** eleven products, category filters, search, empty states, accessible add buttons, local cart, quantities and removal.
- **Checkout:** dine-in/table (1–99) or takeaway, preferences, payment preference, itemized integer PKR billing and a clearly labelled illustrative 5% tax. Checkout creates a local demo order and redirects to its receipt.
- **Billing:** dedicated page with order history (last 20), itemized receipt, unpaid status, menu QR, print/save PDF and JSON download. A sample receipt is available without creating an order.
- **Local owner QR tool (not published):** locally generated SVG codes for general menus or table-specific links, SVG download, link copy and printable branded table card. `?table=7#menu` opens the menu and preselects table 7.
- **Reservations/contact:** validated, clearly labelled local demo records; future dates, 90-day window, half-hour slots and illustrative opening hours are checked.
- Native modal dialogs, keyboard controls, Escape dismissal, focus restoration, skip link, reduced-motion support, mobile navigation and responsive layouts.
- Demo-data reset is a two-click action. Data stays under the `aroma.v2.` browser-storage namespace; nothing is sent to a server.

## Customer QR setup

1. Deploy the site to an HTTPS domain accessible without sign-in.
2. Run `npm run owner` on your computer and open http://127.0.0.1:4175. Enter the final public website URL (include the project subdirectory if applicable).
3. Choose a general menu code or a table number and update the preview.
4. Open the menu link on a separate phone without authentication, then scan the actual QR.
5. Download the SVG for a printed menu, or print the table card. Use black on white and retain the quiet zone.
6. Customer receipts automatically link to the website where the order was created. Owner settings do not change customer receipt URLs. A printed code points to the menu, not to a payment destination or a customer's receipt.

Localhost is only accessible on the machine serving it. Owner-private preview links are unsuitable for customers. A printed QR is permanent: it continues to encode the URL used when generated.

## Portfolio scope and live-café requirements

This is a fictional café **frontend portfolio demo**, not a production POS. Prices, neighbourhood, opening hours and tax are illustrative. No payment is collected. No order, reservation or message is sent to café staff. Browser storage is device-specific and can be edited or cleared; receipt links do not transfer orders between phones. A message cannot be claimed as emailed and a reservation cannot be claimed as confirmed.

For real café service, add an authenticated staff dashboard, server-backed orders and table sessions, inventory/availability, real reservation capacity, payment provider and verified webhooks, fiscal rules, reliable notifications and access controls. Never use local browser receipts as proof of payment. No actual client details or payment credentials are required for this demo.

## Structure

- `index.html`: café and menu
- `billing.html`: receipts/history
- `owner-tools/qr.html` and `owner-tools/owner-qr.js`: local-only owner QR tool, excluded from publication
- `tools/owner-server.cjs`: loopback-only owner server (`npm run owner`)
- `robots.txt`: crawler exclusions for obsolete owner URLs and receipts; not an access-control mechanism
- `data.js`: catalog, billing and validation domain rules
- `script.js`: page interactions and browser persistence
- `style.css`: shared base layout and print rules
- `experience.css`: reference-led dark theme, responsive signature hero, motion and print adaptations
- `assets/`: local café photography and favicon
- `vendor/qrcode.js`: vendored MIT QR generator
- `tests/`: domain, QR, integrity and interaction tests
- `tools/build.cjs`: dependency-free static build

## Validation

`npm test` checks integer totals, cart restoration, malformed data, URL/table handling, reservation boundaries, HTML/asset integrity and actual QR generation. Browser visual QA was blocked in the authoring environment by browser session / Windows URL-policy support; perform a final visual check at 375px, 768px and desktop before a client launch. Test printed QR codes on an actual phone.

## Credits

Photography: Unsplash (downloaded local assets; see `CREDITS.md`). Typography: Google Fonts, DM Sans and Playfair Display, with system fallbacks. QR generator: Kazuhiko Arase, `qrcode-generator` v1.4.4, MIT; original copyright retained in the vendored source. Café Aroma is an illustrative portfolio brand.

## Visual reference

The latest design follows the supplied Glacé hero video: oversized background type, a central drink cutout, warm textured dark surfaces, flavour selection and coordinated scene transitions. Original Café Aroma branding and working local order/QR flows are retained. See `DESIGN.md` for the design and image-generation brief.

## Owner/customer separation

The public menu, header, mobile navigation, footer, hero and billing page contain no QR creator links or controls. The former QR promotional section was removed. The public JavaScript has no generator form logic. The build uses an explicit customer-file allowlist and removes legacy `dist/qr.html` before packaging. The owner HTML and script stay in source only; never publish the source folder itself. Publish **dist/**.

`npm run owner` binds only to 127.0.0.1:4175 and serves an explicit set of QR-tool files. It is a local utility, not a public admin login. Its page has noindex/nofollow/noarchive metadata and the server sends an X-Robots-Tag. Do not deploy this server or expose it through a tunnel. A future remotely accessible admin dashboard would require server-side authentication and authorization; hiding links or adding robots directives is not protection.
