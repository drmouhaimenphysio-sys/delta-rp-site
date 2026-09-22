"use client";

import { useState } from "react";
import { ICONS } from "./icons";

// data: { [optionKey]: string[] }, iconFor: { [optionKey]: iconName }
export default function ToggleGrid({ data, iconFor, defaultOption }) {
  const options = Object.keys(data);
  const [active, setActive] = useState(defaultOption || options[0]);

  return (
    <>
      <div className="switcher">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`switchBtn ${active === opt ? "switchActive" : ""}`}
            onClick={() => setActive(opt)}
          >
            {opt[0].toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid">
        {data[active].map((name) => (
          <div className="card" key={name}>
            {ICONS[iconFor[active]]}
            <div className="item-name">{name}</div>
            <div className="item-cat">{active}</div>
          </div>
        ))}
      </div>
    </>
  );
}
