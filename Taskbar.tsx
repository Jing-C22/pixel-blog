import { useEffect, useRef, useState } from "react";
import type { Post, ZoneConfig } from "../content/types";
import { ZoneSprite } from "./ZoneSprite";
import { sfx } from "../utils/sfx";

interface ZoneMarkerProps {
  zone: ZoneConfig;
  posts: Post[];
  onOpenPost: (post: Post, originX: number, originY: number) => void;
}

export function ZoneMarker({ zone, posts, onOpenPost }: ZoneMarkerProps) {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    sfx.click();
    setActive((a) => !a);
  };

  const handlePostClick = (post: Post) => {
    const rect = rootRef.current?.getBoundingClientRect();
    sfx.open();
    onOpenPost(post, rect ? rect.x + rect.width / 2 : window.innerWidth / 2, rect ? rect.y : window.innerHeight / 2);
    setActive(false);
  };

  useEffect(() => {
    if (!active) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setActive(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  return (
    <div
      ref={rootRef}
      className="zone-marker"
      style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
    >
      <button
        type="button"
        className="zone-marker-button"
        onMouseEnter={() => sfx.hover()}
        onClick={handleToggle}
        aria-expanded={active}
        aria-label={`Open ${zone.label}`}
      >
        <ZoneSprite zone={zone.id} />
        <span className="zone-label pixel-text">{zone.label}</span>
      </button>

      {active && (
        <div className="zone-popover pixel-panel">
          <div className="zone-popover-header pixel-text">{zone.label}</div>
          <ul className="zone-post-list">
            {posts.length === 0 && (
              <li className="zone-post-empty">Nothing here yet.</li>
            )}
            {posts.map((post) => (
              <li key={post.slug}>
                <button
                  type="button"
                  className="zone-post-item"
                  onMouseEnter={() => sfx.hover()}
                  onClick={() => handlePostClick(post)}
                >
                  <span className="zone-post-icon">{post.icon}</span>
                  <span className="zone-post-title">{post.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
