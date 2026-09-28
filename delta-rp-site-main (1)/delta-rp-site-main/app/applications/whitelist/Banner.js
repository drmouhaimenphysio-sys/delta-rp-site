"use client";

import { useEffect, useRef, useState } from "react";

// Shows /whitelist/banner.png. Hides itself if the file is missing.
export default function Banner({ className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setVisible(false);
  }, []);

  if (!visible) return null;
  return (
    <img
      ref={ref}
      className={className}
      src="/whitelist/banner.png"
      alt="Apply for the whitelist"
      onError={() => setVisible(false)}
    />
  );
}
