import { NextResponse } from "next/server";
import { appUrl } from "@/lib/whitelist/discord";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  cookieOptions,
  signSession,
} from "@/lib/whitelist/session";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const base = appUrl();
  const home = `${base}/applications/whitelist`;
  const fail = () => NextResponse.redirect(`${home}?error=oauth`);

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const savedState = req.cookies.get("wl_state")?.value;
  if (!code || !state || state !== savedState) return fail();

  const tokenRes = await fetch("https://discord.com/api/v10/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: `${base}/api/auth/callback`,
    }),
  });
  if (!tokenRes.ok) {
    console.error("OAuth token error", tokenRes.status, await tokenRes.text());
    return fail();
  }
  const { access_token } = await tokenRes.json();

  const userRes = await fetch("https://discord.com/api/v10/users/@me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!userRes.ok) return fail();
  const user = await userRes.json();

  const token = await signSession({
    id: user.id,
    username: user.global_name || user.username,
    avatar: user.avatar,
  });

  const res = NextResponse.redirect(home);
  res.cookies.set(SESSION_COOKIE, token, cookieOptions(SESSION_MAX_AGE));
  res.cookies.delete("wl_state");
  return res;
}
