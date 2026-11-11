# Café Aroma

A considered café experience built with HTML, CSS and JavaScript. Forest green, warm paper tones, editorial type, locally served photography and restrained motion frame a complete digital-menu portfolio demo.

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

Deploy the generated `dist` directory to any static host. All three HTML pages must be served. Relative asset URLs support subdirectory hosting. Keep the domain stable after printing QR codes.

## Experience

- **Home / digital menu:** eight products, category filters, search, empty states, accessible add buttons, local cart, quantities and removal.
- **Checkout:** dine-in/table (1–99) or takeaway, preferences, payment preference, itemized integer PKR billing and a clearly labelled illustrative 5% tax. Checkout creates a local demo order and redirects to its receipt.
- **Billing:** dedicated page with order history (last 20), itemized receipt, unpaid status, menu QR, print/save PDF and JSON download. A sample receipt is available without creating an order.
- **QR studio:** locally generated SVG codes for general menus or table-specific links, SVG download, link copy and printable branded table card. `?table=7#menu` opens the menu and preselects table 7.
- **Reservations/contact:** validated, clearly labelled local demo records; future dates, 90-day window, half-hour slots and illustrative opening hours are checked.
- Native modal dialogs, keyboard controls, Escape dismissal, focus restoration, skip link, reduced-motion support, mobile navigation and responsive layouts.
- Demo-data reset is a two-click action. Data stays under the `aroma.v2.` browser-storage namespace; nothing is sent to a server.

## Customer QR setup

1. Deploy the site to an HTTPS domain accessible without sign-in.
2. Open `qr.html` and enter the final public website URL (include the project subdirectory if applicable).
3. Choose a general menu code or a table number and update the preview.
4. Open the menu link on a separate phone without authentication, then scan the actual QR.
5. Download the SVG for a printed menu, or print the table card. Use black on white and retain the quiet zone.
6. New receipts use this saved website address. A code points to the menu, not to a payment destination or a customer's receipt.

Localhost is only accessible on the machine serving it. Owner-private preview links are unsuitable for customers. A printed QR is permanent: it continues to encode the URL used when generated.

## Portfolio scope and live-café requirements

This is a fictional café **frontend portfolio demo**, not a production POS. Prices, neighbourhood, opening hours and tax are illustrative. No payment is collected. No order, reservation or message is sent to café staff. Browser storage is device-specific and can be edited or cleared; receipt links do not transfer orders between phones. A message cannot be claimed as emailed and a reservation cannot be claimed as confirmed.

For real café service, add an authenticated staff dashboard, server-backed orders and table sessions, inventory/availability, real reservation capacity, payment provider and verified webhooks, fiscal rules, reliable notifications and access controls. Never use local browser receipts as proof of payment. No actual client details or payment credentials are required for this demo.

## Structure

- `index.html`: café and menu
- `billing.html`: receipts/history
- `qr.html`: QR studio
- `data.js`: catalog, billing and validation domain rules
- `script.js`: page interactions and browser persistence
- `style.css`: responsive design, motion, print rules
- `assets/`: local café photography and favicon
- `vendor/qrcode.js`: vendored MIT QR generator
- `tests/`: domain, QR, integrity and interaction tests
- `tools/build.cjs`: dependency-free static build

## Validation

`npm test` checks integer totals, cart restoration, malformed data, URL/table handling, reservation boundaries, HTML/asset integrity and actual QR generation. Browser visual QA was blocked in the authoring environment by browser session / Windows URL-policy support; perform a final visual check at 375px, 768px and desktop before a client launch. Test printed QR codes on an actual phone.

## Credits

Photography: Unsplash (downloaded local assets; see `CREDITS.md`). Typography: Google Fonts, DM Sans and Playfair Display, with system fallbacks. QR generator: Kazuhiko Arase, `qrcode-generator` v1.4.4, MIT; original copyright retained in the vendored source. Café Aroma is an illustrative portfolio brand.
