"use client";

import { useState } from "react";
import { ICONS } from "./icons";

// data: { [optionKey]: (string | { name, images })[] }, iconFor: { [optionKey]: iconName }
// Plain strings render as an icon + name card (vehicles, peds, houses).
// Items with an `images` array render a cover photo + name + a small
// thumbnail row. Clicking any photo opens a full-size viewer where you can
// switch between that item's photos.
export default function ToggleGrid({ data, iconFor, defaultOption }) {
  const options = Object.keys(data);
  const [active, setActive] = useState(defaultOption || options[0]);
  const [viewer, setViewer] = useState(null); // { name, images, index } | null

  function openViewer(item, index) {
    setViewer({ name: item.name, images: item.images, index });
  }

  function step(delta) {
    setViewer((v) => (v ? { ...v, index: (v.index + delta + v.images.length) % v.images.length } : v));
  }

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
              <img
                src={cover}
                alt={item.name}
                className="business-cover"
                onClick={() => openViewer(item, 0)}
              />
              <div className="item-name">{item.name}</div>
              {rest.length > 0 && (
                <div className="thumb-row">
                  {rest.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={item.name}
                      className="thumb-sm"
                      onClick={() => openViewer(item, i + 1)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {viewer && (
        <div className="viewer-overlay" onClick={() => setViewer(null)}>
          <button type="button" className="viewer-close" onClick={() => setViewer(null)} aria-label="Close">
            ✕
          </button>
          <button
            type="button"
            className="viewer-arrow viewer-arrow-left"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <div className="viewer-body" onClick={(e) => e.stopPropagation()}>
            <img src={viewer.images[viewer.index]} alt={viewer.name} className="viewer-img" />
            <div className="viewer-caption">
              {viewer.name} — {viewer.index + 1}/{viewer.images.length}
            </div>
          </div>
          <button
            type="button"
            className="viewer-arrow viewer-arrow-right"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
