import ToggleGrid from "@/components/ToggleGrid";
import { VEHICLES } from "@/lib/data";

export const metadata = { title: "Vehicles" };

const ICON_FOR = { cars: "car", motos: "moto" };

export default function VehiclesPage() {
  return (
    <main className="page">
      <div className="container">
        <div className="eyebrow">Add-ons</div>
        <h1 style={{ fontSize: "clamp(32px,5vw,52px)" }}>Vehicles</h1>
        <p className="lead" style={{ marginTop: 12 }}>Custom cars and motorcycles running the streets of Delta City.</p>
        <ToggleGrid data={VEHICLES} iconFor={ICON_FOR} defaultOption="cars" />
      </div>
    </main>
  );
}
