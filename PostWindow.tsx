import type { ZoneId } from "../content/types";

interface ZoneSpriteProps {
  zone: ZoneId;
}

/**
 * Small pixel-art building sprites, one per zone. Pure SVG, no image assets.
 */
export function ZoneSprite({ zone }: ZoneSpriteProps) {
  switch (zone) {
    case "hut":
      return (
        <svg viewBox="0 0 32 32" shapeRendering="crispEdges" className="zone-sprite-svg">
          <rect x="6" y="16" width="20" height="12" fill="#a8703f" />
          <rect x="6" y="16" width="20" height="2" fill="#8a5a30" />
          <polygon points="3,16 16,6 29,16" fill="#ff6b9d" />
          <polygon points="3,16 16,6 16,9 6,17" fill="#e0568a" />
          <rect x="14" y="20" width="5" height="8" fill="#5a3a20" />
          <rect x="9" y="19" width="4" height="4" fill="#ffd23f" opacity="0.9" />
          <rect x="19" y="19" width="4" height="4" fill="#ffd23f" opacity="0.9" />
          <rect x="14" y="5" width="3" height="5" fill="#5a3a20" />
        </svg>
      );
    case "tower":
      return (
        <svg viewBox="0 0 32 40" shapeRendering="crispEdges" className="zone-sprite-svg">
          <rect x="11" y="14" width="10" height="26" fill="#4ecdc4" />
          <rect x="11" y="14" width="10" height="2" fill="#3aa89f" />
          <rect x="9" y="6" width="14" height="9" fill="#3aa89f" />
          <polygon points="7,6 16,0 25,6" fill="#ff6b9d" />
          <rect x="14" y="22" width="4" height="5" fill="#ffd23f" opacity="0.85" />
          <rect x="14" y="30" width="4" height="5" fill="#ffd23f" opacity="0.85" />
          <rect x="15" y="2" width="2" height="4" fill="#0d0a14" />
        </svg>
      );
    case "cave":
      return (
        <svg viewBox="0 0 32 24" shapeRendering="crispEdges" className="zone-sprite-svg">
          <path
            d="M2 24 L4 14 L10 6 L16 3 L22 6 L28 14 L30 24 Z"
            fill="#6b5d52"
          />
          <path
            d="M2 24 L4 14 L10 6 L16 3 L16 24 Z"
            fill="#594c43"
          />
          <ellipse cx="16" cy="20" rx="6" ry="7" fill="#0d0a14" />
          <rect x="13" y="17" width="2" height="2" fill="#ffd23f" opacity="0.8" />
        </svg>
      );
    case "tree":
      return (
        <svg viewBox="0 0 28 36" shapeRendering="crispEdges" className="zone-sprite-svg">
          <rect x="12" y="22" width="4" height="14" fill="#5a3a20" />
          <circle cx="14" cy="14" r="13" fill="#2f6e4f" />
          <circle cx="8" cy="10" r="4" fill="#3a8560" opacity="0.7" />
          <circle cx="20" cy="11" r="5" fill="#3a8560" opacity="0.7" />
          <circle cx="14" cy="6" r="4" fill="#3a8560" opacity="0.7" />
          <rect x="9" y="13" width="2" height="2" fill="#ff6b9d" />
          <rect x="17" y="16" width="2" height="2" fill="#ff6b9d" />
          <rect x="13" y="9" width="2" height="2" fill="#ff6b9d" />
        </svg>
      );
  }
}
