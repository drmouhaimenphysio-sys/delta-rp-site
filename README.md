# Delta RP — server site

Separate Next.js project, independent from the whitelist app. Pages:

- `/` — home, lore
- `/staff` — staff hierarchy
- `/vehicles` — cars / motos toggle
- `/property` — business / houses toggle
- `/peds` — male / female peds toggle
- `/applications/staff` — placeholder
- `/applications/faction` — placeholder

The nav's "Applications" button opens a dropdown with all three
applications (Staff, Whitelist, Faction). Whitelist links out to the
existing whitelist app for now.

## Edit content

Everything editable (names, lore, staff, add-on lists, the applications
list and links) lives in `lib/data.js`. No other file needs touching to
update content.

## Background photo

The homepage hero reads its background image from `public/hero-bg.jpg`.
Add a JPG with exactly that name and path for it to show up.

## Run locally

```
npm install
npm run dev
```

## Deploy

Push this folder to its own GitHub repo and import it in Vercel as a
new project (separate from `whitelist-app`). Once the whitelist flow is
rebuilt as a page inside this project, swap the Whitelist entry in
`APPLICATIONS` (in `lib/data.js`) to an internal route, and the old
whitelist-app project can be retired.
