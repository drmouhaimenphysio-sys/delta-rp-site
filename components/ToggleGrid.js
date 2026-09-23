"use client";

import { useState } from "react";
import { ICONS } from "./icons";

// data: { [optionKey]: (string | { name, images })[] }, iconFor: { [optionKey]: iconName }
// Plain strings render as an icon + name card (vehicles, peds, houses).
// Items with an `images` array render a cover photo + name, with the rest
// of that item's photos shown as a small thumbnail row underneath.
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
        {data[active].map((item) => {
          const hasPhotos = typeof item === "object" && item.images;

          if (!hasPhotos) {
            return (
              <div className="card" key={item}>
                {ICONS[iconFor[active]]}
                <div className="item-name">{item}</div>
                <div className="item-cat">{active}</div>
              </div>
            );
          }

          const [cover, ...rest] = item.images;
          return (
            <div className="card business-card" key={item.name}>
              <img src={cover} alt={item.name} className="business-cover" />
              <div className="item-name">{item.name}</div>
              {rest.length > 0 && (
                <div className="thumb-row">
                  {rest.map((src) => (
                    <img key={src} src={src} alt={item.name} className="thumb-sm" />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
