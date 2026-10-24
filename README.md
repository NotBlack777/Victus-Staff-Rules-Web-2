# Victus Cloud – Staff Rules

Single-page, framework-free staff handbook for Victus Cloud staff.
Live: https://victus-staff-rules.vercel.app

## Layout
| File | What it is |
|---|---|
| `index.html` | **The live site.** Canonical single-file build (data object + CSS + JS inline). Vercel deploys the repo root, so whatever is in this file on `main` is what staff see. |
| `deploy/` | The same site split into `index.html`, `styles.css`, `data.js`, `app.js`, kept only as a manual-upload fallback / reference. **Not** what the Git deploy serves - editing it changes nothing live. Reachable at `/deploy/index` if you ever need it. |
| `robots.txt` | `User-agent: *` / `Disallow: /` |
| `vercel.json` | `cleanUrls` + `X-Robots-Tag` / `X-Content-Type-Options` / `Referrer-Policy` headers. Active, because the project now deploys from Git. |
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
* `noindex` is set three ways: the `<meta name="robots">` tag, `robots.txt`, and the
  `X-Robots-Tag` header in `vercel.json`.

## Deployment
`main` of `NotBlack777/Victus-Staff-Rules-Web-2` is connected to the Vercel project
`victus-staff-rules` (framework *Other*-style static serve: root directory, no build), so a
push to `main` publishes to https://victus-staff-rules.vercel.app automatically.

Commit author emails must belong to a GitHub account, or Vercel blocks the build with
`COMMIT_AUTHOR_REQUIRED` on the Hobby plan.
