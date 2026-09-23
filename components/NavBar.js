import Link from "next/link";
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
  return (
    <header
      style={{
        borderBottom: "1px solid var(--line)",
        position: "sticky",
        top: 0,
        background: "rgba(11,14,18,0.85)",
        backdropFilter: "blur(8px)",
        zIndex: 10,
      }}
    >
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
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="btn nav-btn">
              {l.label}
            </Link>
          ))}
        </nav>
        <ApplicationsMenu />
      </div>
    </header>
  );
}
