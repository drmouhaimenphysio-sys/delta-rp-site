import Link from "next/link";
import { SERVER_NAME, TAGLINE, STORY } from "@/lib/data";
import { ICONS } from "@/components/icons";

const SECTIONS = [
  { href: "/staff", label: "Staff", desc: "Who runs the city", icon: "staff" },
  { href: "/vehicles", label: "Vehicles", desc: "Cars & motorcycles", icon: "vehicles" },
  { href: "/property", label: "Property", desc: "Businesses & houses", icon: "property" },
  { href: "/peds", label: "Peds", desc: "Male & female peds", icon: "peds" },
];

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">
        <div className="hero">
          <div className="eyebrow">{SERVER_NAME} — FiveM Roleplay</div>
          <h1 style={{ fontSize: "clamp(40px,7vw,72px)", maxWidth: "14ch" }}>Server Story-Line</h1>
          <p className="lead" style={{ marginTop: 18, fontSize: "1.1rem", color: "#d7dbe2" }}>{TAGLINE}</p>

          <div style={{ marginTop: 28, display: "grid", gap: 14, maxWidth: 640 }}>
            {STORY.map((p, i) => (
              <p className="lead" style={{ color: "#c7ccd6" }} key={i}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 14,
            marginTop: 32,
          }}
        >
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="card" style={{ textDecoration: "none", display: "block" }}>
              {ICONS[s.icon]}
              <div className="card-title">{s.label}</div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: 4 }}>{s.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
