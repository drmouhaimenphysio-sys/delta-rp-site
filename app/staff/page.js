import { STAFF } from "@/lib/data";

export const metadata = { title: "Staff" };

function StaffCard({ name, role, big }) {
  return (
    <div
      className="card"
      style={{
        flex: big ? "1 1 100%" : "1 1 160px",
        borderColor: big ? "var(--accent)" : "var(--line)",
      }}
    >
      <div style={{ color: "var(--accent)", fontSize: "0.78rem" }}>{role}</div>
      <div style={{ fontWeight: 700, fontSize: big ? "1.4rem" : "1.05rem", marginTop: 4 }}>{name}</div>
    </div>
  );
}

export default function StaffPage() {
  return (
    <main className="page">
      <div className="container">
        <div className="eyebrow">Chain of command</div>
        <h1 style={{ fontSize: "clamp(32px,5vw,52px)" }}>Staff</h1>
        <p className="lead" style={{ marginTop: 12 }}>The people keeping the city running, from the top down.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 32 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <StaffCard name={STAFF.owner.name} role={STAFF.owner.role} big />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {STAFF.management.map((s, i) => (
              <StaffCard key={i} name={s.name} role={s.role} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {STAFF.support.map((s, i) => (
              <StaffCard key={i} name={s.name} role={s.role} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
