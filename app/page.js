import Link from "next/link";
import { SERVER_NAME, TAGLINE, STORY } from "@/lib/data";

const SECTIONS = [
  { href: "/staff", label: "Staff", desc: "Who runs the city" },
  { href: "/vehicles", label: "Vehicles", desc: "Cars & motorcycles" },
  { href: "/property", label: "Property", desc: "Businesses & houses" },
  { href: "/citizens", label: "Citizens", desc: "Male & female peds" },
];

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">
        <div className="eyebrow">{SERVER_NAME} — FiveM Roleplay</div>
        <h1 style={{ fontSize: "clamp(40px,7vw,72px)", maxWidth: "14ch" }}>Server Story-Line</h1>
        <p className="lead" style={{ marginTop: 18, fontSize: "1.1rem" }}>{TAGLINE}</p>

        <div style={{ marginTop: 28, display: "grid", gap: 14, maxWidth: 640 }}>
          {STORY.map((p, i) => (
            <p className="lead" key={i}>
              {p}
            </p>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 14,
            marginTop: 48,
          }}
        >
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="card" style={{ textDecoration: "none", display: "block" }}>
              <div style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.15rem" }}>{s.label}</div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: 4 }}>{s.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
