"use client";

import { useState } from "react";
import { ICONS } from "./icons";

// data: { [optionKey]: (string | { name, images })[] }, iconFor: { [optionKey]: iconName }
// Plain strings render as an icon + name card (vehicles, peds, houses).
// Items with an `images` array render a cover photo + name + a small
// thumbnail row. Clicking any photo opens a full-size viewer where you can
// switch between that item's photos.
// buyOptions: option keys (e.g. "business") whose cards get a "Buy" button
// that opens a small form asking for the player's Discord User ID, then
// sends a ticket to the SHOP-SUB Discord channel.
export default function ToggleGrid({ data, iconFor, defaultOption, buyOptions = [] }) {
  const options = Object.keys(data);
  const [active, setActive] = useState(defaultOption || options[0]);
  const [viewer, setViewer] = useState(null); // { name, images, index } | null
  const [buyTarget, setBuyTarget] = useState(null); // name of item being bought | null
  const [discordId, setDiscordId] = useState("");
  const [buyStatus, setBuyStatus] = useState({ state: "idle" }); // idle | sending | done | error

  function openViewer(item, index) {
    setViewer({ name: item.name, images: item.images, index });
  }

  function step(delta) {
    setViewer((v) => (v ? { ...v, index: (v.index + delta + v.images.length) % v.images.length } : v));
  }

  function openBuy(name) {
    setBuyTarget(name);
    setDiscordId("");
    setBuyStatus({ state: "idle" });
  }

  function closeBuy() {
    setBuyTarget(null);
    setDiscordId("");
    setBuyStatus({ state: "idle" });
  }

  async function submitBuy(e) {
    e.preventDefault();
    if (buyStatus.state === "sending") return;
    setBuyStatus({ state: "sending" });
    try {
      const res = await fetch("/api/shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business: buyTarget, discordId: discordId.trim() }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBuyStatus({ state: "error", message: json.error || "Something went wrong." });
        return;
      }
      setBuyStatus({ state: "done" });
    } catch {
      setBuyStatus({ state: "error", message: "Network error. Please try again." });
    }
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
          const canBuy = buyOptions.includes(active);
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
              {item.price && <div className="item-price">{item.price}</div>}
              {canBuy && (
                <button type="button" className="btn buy-btn" onClick={() => openBuy(item.name)}>
                  Buy
                </button>
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

      {buyTarget && (
        <div className="viewer-overlay" onClick={closeBuy}>
          <div className="buy-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="viewer-close buy-modal-close" onClick={closeBuy} aria-label="Close">
              ✕
            </button>

            {buyStatus.state === "done" ? (
              <>
                <h3 className="buy-modal-title">Request sent ✅</h3>
                <p className="buy-modal-text">
                  A ticket for <strong>{buyTarget}</strong> was sent to our staff. They&apos;ll reach out to you on
                  Discord shortly.
                </p>
                <button type="button" className="btn" onClick={closeBuy}>
                  Close
                </button>
              </>
            ) : (
              <form onSubmit={submitBuy}>
                <h3 className="buy-modal-title">Buy {buyTarget}</h3>
                <p className="buy-modal-text">
                  Enter your Discord User ID and our staff will contact you to complete the purchase.
                </p>
                <label className="buy-modal-label" htmlFor="buy-discord-id">
                  Discord User ID
                </label>
                <input
                  id="buy-discord-id"
                  className="buy-modal-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 123456789012345678"
                  value={discordId}
                  onChange={(e) => setDiscordId(e.target.value)}
                  required
                />
                <p className="buy-modal-hint">
                  Right-click your name in Discord → Copy User ID. (Enable Developer Mode in Discord settings if you
                  don&apos;t see that option.)
                </p>
                {buyStatus.state === "error" && <p className="buy-modal-error">{buyStatus.message}</p>}
                <button type="submit" className="btn" disabled={buyStatus.state === "sending"}>
                  {buyStatus.state === "sending" ? "Sending…" : "Send request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
