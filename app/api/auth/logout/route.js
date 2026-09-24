import { NextResponse } from "next/server";
import { appUrl } from "@/lib/whitelist/discord";
import { SESSION_COOKIE } from "@/lib/whitelist/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const res = NextResponse.redirect(`${appUrl()}/applications/whitelist`);
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
