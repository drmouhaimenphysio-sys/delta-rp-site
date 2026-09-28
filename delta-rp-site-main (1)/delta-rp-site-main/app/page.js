import Link from "next/link";
import { SEASON_LABEL, TAGLINE, STORY } from "@/lib/data";
import { ICONS } from "@/components/icons";

const SECTIONS = [
  { href: "/staff", label: "Staff", desc: "Who runs the city", icon: "staff" },
  { href: "/streamers", label: "Streamers", desc: "Creators going live", icon: "streamers" },
  { href: "/vehicles", label: "Vehicles", desc: "Cars & motorcycles", icon: "vehicles" },
  { href: "/property", label: "Property", desc: "Businesses & houses", icon: "property" },
  { href: "/peds", label: "Peds", desc: "Male & female peds", icon: "peds" },
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero-banner">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "nowrap" }}>
            <span className="season-badge" style={{ marginBottom: 0, whiteSpace: "nowrap", flexShrink: 0 }}>{SEASON_LABEL}</span>
            <h1 style={{ fontSize: "clamp(28px,6vw,72px)", maxWidth: "16ch" }}>DELTA STORY-LINE</h1>
          </div>
          <p className="lead" style={{ marginTop: 18, fontSize: "1.1rem", color: "#d7dbe2" }}>{TAGLINE}</p>
        </div>
      </section>

      <div className="container">
        <div style={{ marginTop: 40, maxWidth: 640 }}>
          {STORY.map((block, i) => (
            <div className="lore-block" key={i}>
              <div className="lore-title">{block.title}</div>
              {block.subtitle && <div className="lore-subtitle">{block.subtitle}</div>}
              {block.body && <p className="lore-body">{block.body}</p>}
              {block.bullets && (
                <ul className="lore-bullets">
                  {block.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
