export const metadata = { title: "Staff Application" };

export default function StaffApplicationPage() {
  return (
    <main className="page">
      <div className="container">
        <div className="eyebrow">Applications</div>
        <h1 style={{ fontSize: "clamp(32px,5vw,52px)" }}>Staff Application</h1>
        <p className="lead" style={{ marginTop: 12 }}>
          The staff application form isn't wired up yet — this page is a placeholder. Replace this content once
          the form is ready.
        </p>
      </div>
    </main>
  );
}
