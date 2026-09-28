// Sends a "someone wants to buy this business" ticket to the SHOP-SUB
// Discord channel via webhook. Configure the webhook URL with the
// SHOP_SUB_WEBHOOK_URL environment variable (recommended — see README),
// otherwise it falls back to the URL below.

const FALLBACK_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1553979645613834292/Fuwf_FEp-i0Diy7ASIuhOxGdbm_8uV1oO-yAnrki8v5pgyoFMl5fVjfHvTr8r4hdnsIR";

export const dynamic = "force-dynamic";

const bad = (error, status = 400) => Response.json({ error }, { status });

export async function POST(req) {
  let data;
  try {
    data = await req.json();
  } catch {
    return bad("Invalid request.");
  }

  const business = String(data?.business ?? "").trim();
  const discordId = String(data?.discordId ?? "").trim();

  if (!business) return bad("Missing business name.");
  if (!/^\d{15,25}$/.test(discordId)) {
    return bad("Please enter a valid Discord User ID (right-click your name in Discord → Copy User ID).");
  }

  const webhookUrl = process.env.SHOP_SUB_WEBHOOK_URL || FALLBACK_WEBHOOK_URL;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🛒 New purchase request — <@${discordId}>`,
        embeds: [
          {
            title: "New Business Purchase Request",
            color: 0xf5b942,
            fields: [
              { name: "Business", value: business, inline: true },
              { name: "Buyer Discord ID", value: discordId, inline: true },
            ],
            footer: { text: "Property page — Buy button" },
            timestamp: new Date().toISOString(),
          },
        ],
        allowed_mentions: { users: [discordId] },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Discord webhook error", res.status, text);
      return bad("Could not send your request. Please try again in a moment.", 502);
    }
  } catch (err) {
    console.error("Discord webhook fetch failed", err);
    return bad("Could not send your request. Please try again in a moment.", 502);
  }

  return Response.json({ ok: true });
}
