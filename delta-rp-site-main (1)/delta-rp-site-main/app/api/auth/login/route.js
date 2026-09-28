import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { appUrl } from "@/lib/whitelist/discord";
import { cookieOptions } from "@/lib/whitelist/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = crypto.randomBytes(16).toString("hex");

  const url = new URL("https://discord.com/oauth2/authorize");
  url.searchParams.set("client_id", process.env.DISCORD_CLIENT_ID);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", `${appUrl()}/api/auth/callback`);
  url.searchParams.set("scope", "identify");
  url.searchParams.set("state", state);

  const res = NextResponse.redirect(url);
  res.cookies.set("wl_state", state, cookieOptions(600));
  return res;
}
