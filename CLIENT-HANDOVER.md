# Café Aroma — Client handover

## Owner QR access

There is currently no hosted admin login or staff dashboard. The owner QR generator is a local utility excluded from customer hosting.

1. Open this project folder in a terminal.
2. Run `npm run owner` (Node.js required).
3. Open http://127.0.0.1:4175 on the same computer.
4. Enter the final publicly accessible café website address.
5. Choose a general menu QR or table number, update the preview, and download the SVG or print a table card.
6. Test the printed QR on a separate phone without signing in.
7. Stop the utility with Ctrl+C.

Do not upload the project source or owner-tools folder to public hosting. Run `npm run build` and publish only `dist/`. Owner tools are not in that output. The current Sites preview is owner-private and is not yet a customer-public domain.

## Customer workflow currently supported

Customers browse the menu, build a bag and save an order summary. They must show that summary at the counter to place the order and pay. Saving does not notify staff or collect payment. Receipts remain unpaid and are not fiscal invoices or proof of payment. The browser keeps the last 20 summaries; they are not synchronized between customer and staff devices.

Reservation details and notes save on the customer's device. Staff have not received them. A reservation must be confirmed directly with the café. The website does not enforce unverified opening hours for a locally saved preference.

Visible demo/portfolio labels and sample-receipt controls were removed. Messages retain accurate counter-confirmation and unpaid status. The placeholder address, neighbourhood map and opening hours were removed pending actual client details.

## Client information still required before launch

- Final café name and branding confirmation
- Street address and verified Google Maps link
- Phone/WhatsApp and business email
- Opening hours and reservation process
- Menu/prices/currency approval
- Confirmed tax rate: current totals explicitly use an estimated 5%; final charges must be confirmed at the counter
- Public HTTPS domain accessible without sign-in

## For live online ordering / remote administration

A real hosted staff dashboard and online order delivery require server-side storage, authentication, staff authorization and notifications. Online payments require a payment provider and verified payment callbacks. Reservations need real capacity/availability management; contact forms need a delivery service. None of these is supplied by removing presentation labels. This version supports a digital-menu and manual-counter workflow, not an online POS.

Validate the public domain and client details before printing QR codes. Printed codes permanently encode the destination used when created.
