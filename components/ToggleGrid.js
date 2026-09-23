"use client";

import { useState } from "react";
import { ICONS } from "./icons";

// data: { [optionKey]: (string | { name, images })[] }, iconFor: { [optionKey]: iconName }
// Items that are plain strings render as before. Items with an `images` array
// become clickable and open a photo gallery for that entry.
export default function ToggleGrid({ data, iconFor, defaultOption }) {
  const options = Object.keys(data);
  const [active, setActive] = useState(defaultOption || options[0]);
  const [gallery, setGallery] = useState(null); // { name, images } | null

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
          const name = hasPhotos ? item.name : item;
          return (
            <div
              className="card"
              key={name}
              onClick={hasPhotos ? () => setGallery(item) : undefined}
              style={hasPhotos ? { cursor: "pointer" } : undefined}
            >
              {ICONS[iconFor[active]]}
              <div className="item-name">{name}</div>
              <div className="item-cat">{hasPhotos ? "View photos" : active}</div>
            </div>
          );
        })}
      </div>

      {gallery && (
        <div className="gallery-overlay" onClick={() => setGallery(null)}>
          <div className="gallery-panel" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-header">
              <div className="gallery-title">{gallery.name}</div>
              <button type="button" className="gallery-close" onClick={() => setGallery(null)} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="gallery-grid">
              {gallery.images.map((src) => (
                <img key={src} src={src} alt={gallery.name} className="gallery-img" />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
