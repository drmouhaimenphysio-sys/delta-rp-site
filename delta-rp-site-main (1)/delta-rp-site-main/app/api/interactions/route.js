import { verifyKey } from "discord-interactions";
import { discordBot } from "@/lib/whitelist/discord";
import { ACCEPTED_MESSAGE, REJECTED_MESSAGE } from "@/lib/whitelist/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  // 1. Verify the request really comes from Discord.
  const raw = await req.text();
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");
  const valid =
    signature &&
    timestamp &&
    (await verifyKey(raw, signature, timestamp, process.env.DISCORD_PUBLIC_KEY));
  if (!valid) return new Response("Invalid request signature", { status: 401 });

  const i = JSON.parse(raw);

  // 2. Discord's PING (used when you save the Interactions Endpoint URL).
  if (i.type === 1) return Response.json({ type: 1 });

  // 3. Button click.
  if (i.type === 3 && i.data?.custom_id?.startsWith("wl:")) {
    const staffRole = process.env.STAFF_ROLE_ID;
    const roles = i.member?.roles ?? [];
    if (staffRole && !roles.includes(staffRole)) {
      return Response.json({
        type: 4,
        data: {
          content: "⛔ You don't have permission to accept or reject applications.",
          flags: 64,
        },
      });
    }

    const [, action, userId] = i.data.custom_id.split(":");
    const accepted = action === "accept";
    const staff = i.member.user;

    const jobs = [
      discordBot(`/channels/${process.env.RESULT_CHANNEL_ID}/messages`, {
        method: "POST",
        body: {
          content: `<@${userId}>\n${accepted ? ACCEPTED_MESSAGE : REJECTED_MESSAGE}`,
          allowed_mentions: { users: [userId] },
        },
      }),
    ];

    // Optional: give a role to accepted players.
    if (accepted && process.env.DISCORD_GUILD_ID && process.env.WHITELIST_ROLE_ID) {
      jobs.push(
        discordBot(
          `/guilds/${process.env.DISCORD_GUILD_ID}/members/${userId}/roles/${process.env.WHITELIST_ROLE_ID}`,
          { method: "PUT" }
        )
      );
    }
    await Promise.allSettled(jobs);

    // Update the original message: colour it, note who decided, remove buttons.
    const embed = {
      ...(i.message?.embeds?.[0] ?? {}),
      color: accepted ? 0x57f287 : 0xed4245,
      footer: {
        text: `${accepted ? "Accepted" : "Rejected"} by ${staff.global_name || staff.username}`,
      },
    };
    return Response.json({
      type: 7,
      data: { embeds: [embed], components: [] },
    });
  }

  return new Response("Unknown interaction", { status: 400 });
}
