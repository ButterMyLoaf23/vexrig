# Local component catalog

`parts.js` is the no-API-key catalog used by the browser and GitHub Pages.
Prices are intentionally stored as editable snapshots rather than presented as
live prices. Component names and baseline specifications are based on current
retail products; re-check them before purchasing.

When a remote source is ready, add a server-side endpoint and use the same
`list`/`getById` repository shape from `features/catalog/remote.js`. Do not put
a retailer or manufacturer API key in `VITE_*` browser variables.
