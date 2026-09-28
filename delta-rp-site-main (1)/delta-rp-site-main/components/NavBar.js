"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVER_NAME, BRAND_SUB } from "@/lib/data";
import ApplicationsMenu from "./ApplicationsMenu";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/staff", label: "Staff" },
  { href: "/streamers", label: "Streamers" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/property", label: "Property" },
  { href: "/peds", label: "Peds" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", gap: 16 }}
      >
        <Link href="/" style={{ textDecoration: "none", lineHeight: 1.15, display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt={SERVER_NAME} style={{ height: 40, width: 40, objectFit: "contain" }} />
          <span>
            <div style={{ fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem" }}>{SERVER_NAME}</div>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--muted)" }}>{BRAND_SUB}</div>
          </span>
        </Link>
        <nav className="nav-links">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} className={`nav-link${active ? " nav-link-active" : ""}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <ApplicationsMenu />
      </div>
    </header>
  );
}
