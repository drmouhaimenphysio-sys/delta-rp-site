import { getSession } from "@/lib/whitelist/session";
import { QUESTIONS, SERVER_NAME } from "@/lib/whitelist/config";
import { discordBot } from "@/lib/whitelist/discord";

export const dynamic = "force-dynamic";

const bad = (error, status = 400) => Response.json({ error }, { status });

export async function POST(req) {
  const session = await getSession();
  if (!session) return bad("Please log in with Discord first.", 401);

  let data;
  try {
    data = await req.json();
  } catch {
    return bad("Invalid request.");
  }

  const fields = [];
  for (const q of QUESTIONS) {
    const value = String(data?.[q.id] ?? "").trim();

    if (!value) {
      if (q.required) return bad(`"${q.label}" is required.`);
      continue;
    }

    if (q.type === "number") {
      const n = Number(value);
      if (
        !Number.isFinite(n) ||
        (q.min !== undefined && n < q.min) ||
        (q.max !== undefined && n > q.max)
      ) {
        return bad(`"${q.label}" must be a number between ${q.min ?? 0} and ${q.max ?? "∞"}.`);
      }
    } else if (q.type === "radio") {
      if (!q.options.includes(value)) return bad(`Invalid answer for "${q.label}".`);
    } else {
      if (q.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return bad("Please enter a valid email address.");
      }
      if (q.minLength && value.length < q.minLength) {
        return bad(`"${q.label}" is too short (minimum ${q.minLength} characters).`);
      }
      if (value.length > (q.maxLength ?? 1000)) {
        return bad(`"${q.label}" is too long.`);
      }
    }

    fields.push({
      name: (q.short ?? q.label).slice(0, 256),
      value: value.slice(0, 1024),
      inline: Boolean(q.inline),
    });
  }

  const staffRole = process.env.STAFF_ROLE_ID;

  try {
    await discordBot(`/channels/${process.env.APPLICATIONS_CHANNEL_ID}/messages`, {
      method: "POST",
      body: {
        content: `${staffRole ? `<@&${staffRole}> ` : ""}📥 New whitelist application`,
        embeds: [
          {
            title: `Whitelist application — ${SERVER_NAME}`,
            description: `<@${session.id}> (${session.username})`,
            color: 0xf5b942,
            fields,
            footer: { text: `ID: ${session.id}` },
            timestamp: new Date().toISOString(),
          },
        ],
        components: [
          {
            type: 1,
            components: [
              { type: 2, style: 3, label: "Accepted", custom_id: `wl:accept:${session.id}` },
              { type: 2, style: 4, label: "Rejected", custom_id: `wl:reject:${session.id}` },
            ],
          },
        ],
        allowed_mentions: { roles: staffRole ? [staffRole] : [], users: [] },
      },
    });
  } catch {
    return bad("Could not send your application. Please try again in a moment.", 502);
  }

  return Response.json({ ok: true });
}
