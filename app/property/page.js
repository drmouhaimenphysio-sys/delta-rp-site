import ToggleGrid from "@/components/ToggleGrid";
import { PROPERTY } from "@/lib/data";

export const metadata = { title: "Property" };

const ICON_FOR = { business: "business", houses: "house" };

export default function PropertyPage() {
  return (
    <main className="page">
      <div className="container">
        <div className="eyebrow">Add-ons</div>
        <h1 style={{ fontSize: "clamp(32px,5vw,52px)" }}>Property</h1>
        <p className="lead" style={{ marginTop: 12 }}>Businesses to run and houses to live in.</p>
        <ToggleGrid data={PROPERTY} iconFor={ICON_FOR} defaultOption="business" />
      </div>
    </main>
  );
}
