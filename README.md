# Victus Cloud – Staff Rules

Single-page, framework-free staff handbook for Victus Cloud staff.
Live: https://victus-staff-rules.vercel.app

## Layout
| File | What it is |
|---|---|
| `index.html` | Canonical single-file build: data object + CSS + JS inline, self-contained. Deploy this as-is from Git. |
| `deploy/` | Identical site split into `index.html`, `styles.css`, `data.js`, `app.js` (same content, same behaviour) — this is what is currently uploaded to Vercel. |
| `robots.txt` | `User-agent: *` / `Disallow: /` |
| `vercel.json` | `cleanUrls` + security/noindex response headers (applies to Git-driven deploys). |
| `assets/logo.png` | The purple "V" logo, also used as favicon and apple-touch-icon. |

## Editing the content
All rules, roles, punishment tables, changelog, version/date, footer links and the gate
password live in ONE object named `STAFF_RULES_DATA`:

* in `index.html` it is the first `<script id="staff-rules-data">` block at the top of `<head>`;
* in `deploy/` it is `deploy/data.js`.

Rule ids (`3.3`, `13.2`, …) are stable: they become the URL hash (`#3.3`), the
"copy link" deep link and the anchor the search box filters on. Tag each rule with
`roles: ["All"]` or a list of the specific roles it applies to.

## Notes
* The page is client-side password protected only (see `meta.password`). That is light
  protection: the content is in the HTML, so anyone who views source can read it.
  Vercel's own Password Protection is **not** available on the Hobby plan
  (Pro: $20/project/month, Enterprise: included). Vercel Authentication (team login)
  is free on all plans but staff would need Vercel accounts.
* `noindex` is set three ways: the `<meta name="robots">` tag, `robots.txt`, and (for
  Git deploys) the `X-Robots-Tag` header in `vercel.json`.
