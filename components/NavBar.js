import Link from "next/link";
import { SERVER_NAME, APPLY_URL } from "@/lib/data";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/staff", label: "Staff" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/property", label: "Property" },
  { href: "/citizens", label: "Citizens" },
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
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}
      >
        <Link href="/" style={{ fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", fontSize: "1.1rem", textDecoration: "none" }}>
          {SERVER_NAME}
        </Link>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ textDecoration: "none", color: "var(--muted)" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={APPLY_URL} className="btn" style={{ padding: "9px 16px", fontSize: "0.9rem" }}>
          Apply
        </a>
      </div>
    </header>
  );
}
