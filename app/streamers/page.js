import { STREAMERS } from "@/lib/data";

export const metadata = { title: "Streamers" };

export default function StreamersPage() {
  return (
    <main className="page">
      <div className="container">
        <div className="eyebrow">Going live</div>
        <h1 style={{ fontSize: "clamp(32px,5vw,52px)" }}>Streamers</h1>
        <p className="lead" style={{ marginTop: 12 }}>Creators broadcasting their Delta stories.</p>

        {STREAMERS.length === 0 ? (
          <p className="lead" style={{ marginTop: 32 }}>
            No streamers listed yet — add them in <code>lib/data.js</code> under <code>STREAMERS</code>.
          </p>
        ) : (
          <div className="grid" style={{ marginTop: 32 }}>
            {STREAMERS.map((s, i) =>
              s.url ? (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="item-name">{s.name}</div>
                </a>
              ) : (
                <div key={i} className="card">
                  <div className="item-name">{s.name}</div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}
