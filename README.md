# Delta RP — server site

Next.js project for the DELTA ROLEPLAY server. Pages:

- `/` — home, lore
- `/staff` — staff hierarchy
- `/streamers` — streamers list
- `/vehicles` — cars / motos toggle
- `/property` — business / houses toggle
- `/peds` — male / female peds toggle
- `/applications/staff` — placeholder
- `/applications/whitelist` — full whitelist application (Discord login + form, merged in from the old standalone whitelist-app)
- `/applications/faction` — placeholder

The nav's "Applications" button opens a dropdown with all three
applications. All three are now internal pages — nothing links out to
another site anymore.

## Edit content

Everything editable (names, lore, staff, add-on lists, the applications
list) lives in `lib/data.js`. The whitelist form's questions and Discord
messages live in `lib/whitelist/config.js`.

## Whitelist application — environment variables

This project now needs the same environment variables the old
`whitelist-app` project used, set in this Vercel project's
Settings → Environment Variables:

- `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET` — from the Discord app's OAuth2 page
- `DISCORD_BOT_TOKEN` — the bot's token
- `DISCORD_PUBLIC_KEY` — from the Discord app's General Information page
- `DISCORD_GUILD_ID` — the server's ID
- `STAFF_ROLE_ID` — role allowed to accept/reject
- `WHITELIST_ROLE_ID` — role given on acceptance (optional)
- `APPLICATIONS_CHANNEL_ID` — where new applications post
- `RESULT_CHANNEL_ID` — where accept/reject results post
- `SESSION_SECRET` — any long random string
- `APP_URL` — this site's full URL, e.g. `https://deltaroleplay.vercel.app` (no trailing slash)

### Also update, in the Discord Developer Portal

- **OAuth2 → Redirects**: add `https://deltaroleplay.vercel.app/api/auth/callback`
- **General Information → Interactions Endpoint URL**: change to
  `https://deltaroleplay.vercel.app/api/interactions`

Once these are updated and the old `whitelist-app` Vercel project is no
longer needed, it can be safely deleted.

## Background photo

The homepage hero reads its background image from `public/hero-bg.jpg`.

## Run locally

```
npm install
npm run dev
```

## Deploy

Push to GitHub and import in Vercel. Don't forget the environment
variables above — the whitelist pages will fail without them.
