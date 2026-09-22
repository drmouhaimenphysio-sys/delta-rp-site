# Delta RP — server site

Separate Next.js project, independent from the whitelist app. Pages:

- `/` — home, story
- `/staff` — staff hierarchy
- `/vehicles` — cars / motos toggle
- `/property` — business / houses toggle
- `/citizens` — male / female peds toggle

## Edit content

Everything editable (names, story text, staff, add-on lists, the Apply
button link) lives in `lib/data.js`. No other file needs touching to
update content.

## Run locally

```
npm install
npm run dev
```

## Deploy

Push this folder to its own GitHub repo and import it in Vercel as a
new project (separate from `whitelist-app`). The "Apply" button in the
nav currently links out to the existing whitelist app
(`APPLY_URL` in `lib/data.js`) — once the whitelist flow is rebuilt as
a page inside this project, just change that link (or replace it with
an internal `/apply` route) and the old whitelist-app project can be
retired.
