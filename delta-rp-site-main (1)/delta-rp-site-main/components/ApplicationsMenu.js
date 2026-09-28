"use client";

import { useEffect, useRef, useState } from "react";
import { APPLICATIONS } from "@/lib/data";

export default function ApplicationsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" className="btn" style={{ padding: "9px 16px", fontSize: "0.9rem" }} onClick={() => setOpen((v) => !v)}>
        Applications
      </button>
      {open && (
        <div className="dropdown">
          {APPLICATIONS.map((a) =>
            a.external ? (
              <a key={a.href} href={a.href} className="dropdown-item" target="_blank" rel="noopener noreferrer">
                {a.label}
              </a>
            ) : (
              <a key={a.href} href={a.href} className="dropdown-item">
                {a.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}
