import ToggleGrid from "@/components/ToggleGrid";
import { CITIZENS } from "@/lib/data";

export const metadata = { title: "Citizens" };

const ICON_FOR = { male: "male", female: "female" };

export default function CitizensPage() {
  return (
    <main className="page">
      <div className="container">
        <div className="eyebrow">Add-ons</div>
        <h1 style={{ fontSize: "clamp(32px,5vw,52px)" }}>Citizens</h1>
        <p className="lead" style={{ marginTop: 12 }}>Ped skins available for male and female characters.</p>
        <ToggleGrid data={CITIZENS} iconFor={ICON_FOR} defaultOption="male" />
      </div>
    </main>
  );
}
