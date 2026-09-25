const PLATFORM_COLORS = {
  Kick: "#53fc18",
  Twitch: "#9146ff",
  YouTube: "#ff0000",
};

function PlatformGlyph({ color }) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill={color} aria-hidden="true">
      <path d="M4 3h6v6H8v3h2v3H8v3h2v3H4V3zm8 9h2V9h3v3h-3v3h3v3h-3v-3h-2v-3z" />
    </svg>
  );
}

export default function StreamerCard({ name, photo, platform, url }) {
  const color = PLATFORM_COLORS[platform] || "var(--accent)";

  const Wrapper = url ? "a" : "div";
  const wrapperProps = url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper {...wrapperProps} className="streamer-card" style={{ "--platform-color": color }}>
      {photo ? (
        <img src={photo} alt={name} className="streamer-photo" />
      ) : (
        <div className="streamer-photo streamer-photo-fallback" />
      )}
      <div className="streamer-scrim" />

      {platform && (
        <span className="streamer-badge">
          <PlatformGlyph color={color} />
          {platform}
        </span>
      )}

      <div className="streamer-info">
        <div className="streamer-name">{name}</div>
        {url && (
          <span className="streamer-cta">
            Watch on {platform || "channel"}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
        )}
      </div>
    </Wrapper>
  );
}
