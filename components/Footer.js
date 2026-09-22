import { SERVER_NAME } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "28px 0", marginTop: 40 }}>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, color: "var(--muted)", fontSize: "0.85rem" }}
      >
        <span>{SERVER_NAME} — FiveM Roleplay</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
