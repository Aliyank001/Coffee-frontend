# Local owner QR tool

This utility is intentionally excluded from the customer website and deployment archive.

1. In the project folder, run `npm run owner`.
2. Open http://127.0.0.1:4175 on your computer.
3. Enter your final public website address (not this localhost address).
4. Choose a general menu QR or table number, then Update QR preview.
5. Download the SVG or print the table card. Test it with a phone before printing in quantity.
6. Stop the utility with Ctrl+C when finished.

Customers scan the printed code and land on the public menu. Table codes preserve the table number for checkout. They do not see this utility. Customer receipt QRs are generated automatically by the customer website.

The server listens only on your own computer. No password is needed for a local utility. Do not upload this folder to hosting or expose this server to the internet. Publish only `dist/`; `npm run build` excludes this folder and removes the obsolete public QR page.

The currently configured Sites preview may require sign-in. Enter an anonymously accessible public domain before customer printing. QR destinations cannot change once printed.
