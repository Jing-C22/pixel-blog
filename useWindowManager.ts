import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { WindowState } from "../hooks/useWindowManager";
import type { Post } from "../content/types";
import { sfx } from "../utils/sfx";

interface PostWindowProps {
  win: WindowState;
  post: Post | undefined;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}

export function PostWindow({
  win,
  post,
  onClose,
  onMinimize,
  onFocus,
  onMove,
}: PostWindowProps) {
  const [mounted, setMounted] = useState(false);
  const dragRef = useRef<{
    dragging: boolean;
    offsetX: number;
    offsetY: number;
  }>({ dragging: false, offsetX: 0, offsetY: 0 });

  // trigger pop-in animation on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    onFocus(win.id);
    dragRef.current = {
      dragging: true,
      offsetX: e.clientX - win.x,
      offsetY: e.clientY - win.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const nx = Math.max(0, e.clientX - dragRef.current.offsetX);
    const ny = Math.max(0, e.clientY - dragRef.current.offsetY);
    onMove(win.id, nx, ny);
  };

  const stopDrag = () => {
    if (dragRef.current.dragging) sfx.drag();
    dragRef.current.dragging = false;
  };

  if (win.minimized) return null;

  // transformOrigin must be relative to this element's own box, not the
  // viewport — translate the icon's viewport position into local coords.
  const originLocalX = win.originX - win.x;
  const originLocalY = win.originY - win.y;

  const style: React.CSSProperties = {
    left: win.x,
    top: win.y,
    zIndex: win.z,
    transformOrigin: `${originLocalX}px ${originLocalY}px`,
  };

  return (
    <div
      className={`post-window pixel-panel${mounted ? " is-open" : " is-opening"}`}
      style={style}
      onMouseDown={() => onFocus(win.id)}
      role="dialog"
      aria-label={win.title}
    >
      <div
        className="post-window-titlebar"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        <span className="post-window-title pixel-text">
          <span className="post-window-icon">{win.icon}</span>
          {win.title}
        </span>
        <div className="post-window-controls">
          <button
            type="button"
            className="win-btn win-btn-min"
            aria-label="Minimize"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              sfx.click();
              onMinimize(win.id);
            }}
          >
            _
          </button>
          <button
            type="button"
            className="win-btn win-btn-close"
            aria-label="Close"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              sfx.close();
              onClose(win.id);
            }}
          >
            ×
          </button>
        </div>
      </div>
      <div className="post-window-body">
        {post ? (
          <article className="post-content">
            <h1>{post.title}</h1>
            <time className="post-date">{post.date}</time>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>
        ) : (
          <p>Post not found.</p>
        )}
      </div>
    </div>
  );
}
