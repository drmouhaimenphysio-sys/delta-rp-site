const API = "https://discord.com/api/v10";

export function appUrl() {
  return (process.env.APP_URL || "").replace(/\/+$/, "");
}

// Call the Discord REST API as the bot.
export async function discordBot(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Discord API error", res.status, method, path, text);
    throw new Error(`Discord API ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}
