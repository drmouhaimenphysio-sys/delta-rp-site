import { cloneElement } from "react";
import { STAFF } from "@/lib/data";
import { ICONS } from "@/components/icons";

export const metadata = { title: "Staff" };

function StaffCard({ name, role, icon, photo, big }) {
  const size = big ? 84 : 64;
  return (
    <div
      className="card"
      style={{
        flex: big ? "1 1 220px" : "1 1 160px",
        borderColor: big ? "var(--accent)" : "var(--line)",
        textAlign: "center",
      }}
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: 10,
            border: "2px solid var(--line)",
          }}
        />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>{ICONS[icon]}</div>
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "var(--accent)", fontSize: "0.78rem" }}>
        {photo && (
          <span style={{ width: 16, height: 16, display: "inline-flex" }}>
            {cloneElement(ICONS[icon], { style: { width: 16, height: 16, stroke: "var(--accent)" } })}
          </span>
        )}
        {role}
      </div>
      <div style={{ fontWeight: 700, fontSize: big ? "1.4rem" : "1.05rem", marginTop: 2 }}>{name}</div>
    </div>
  );
}

function StaffRow({ members, big }) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {members.map((s, i) => (
        <StaffCard key={i} name={s.name} role={s.role} icon={s.icon} photo={s.photo} big={big} />
      ))}
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
          <StaffRow members={STAFF.owner} big />
          <StaffRow members={STAFF.supervisor} />
          <StaffRow members={STAFF.developer} />
          <StaffRow members={STAFF.whitelist} />
          <StaffRow members={STAFF.pcChecker} />
          <StaffRow members={STAFF.support} />
        </div>
      </div>
    </main>
  );
}
