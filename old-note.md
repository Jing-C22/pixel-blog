import { useEffect, useMemo } from "react";
import { IslandScene } from "./components/IslandScene";
import { ZoneMarker } from "./components/ZoneMarker";
import { PostWindow } from "./components/PostWindow";
import { Taskbar } from "./components/Taskbar";
import { CRTOverlay } from "./components/CRTOverlay";
import { posts, zones, getPostsByZone, getPost } from "./content/loader";
import { useWindowManager } from "./hooks/useWindowManager";
import type { Post } from "./content/types";

function App() {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    focusWindow,
    moveWindow,
  } = useWindowManager();

  const postsByZone = useMemo(() => {
    const map: Record<string, Post[]> = {};
    for (const zone of zones) {
      map[zone.id] = getPostsByZone(zone.id);
    }
    return map;
  }, []);

  const handleOpenPost = (post: Post, originX: number, originY: number) => {
    openWindow({
      slug: post.slug,
      title: post.title,
      icon: post.icon,
      originX,
      originY,
    });
  };

  // Escape closes the topmost (highest z-index) open, non-minimized window.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const open = windows.filter((w) => !w.minimized);
      if (open.length === 0) return;
      const topmost = open.reduce((a, b) => (b.z > a.z ? b : a));
      closeWindow(topmost.id);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [windows, closeWindow]);

  return (
    <div className="app-root">
      <div className="island-layer">
        <IslandScene />
      </div>

      <div className="zone-layer">
        {zones.map((zone) => (
          <ZoneMarker
            key={zone.id}
            zone={zone}
            posts={postsByZone[zone.id] ?? []}
            onOpenPost={handleOpenPost}
          />
        ))}
      </div>

      <div className="window-layer">
        {windows.map((win) => (
          <PostWindow
            key={win.id}
            win={win}
            post={getPost(win.slug)}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onFocus={focusWindow}
            onMove={moveWindow}
          />
        ))}
      </div>

      <Taskbar windows={windows} onRestore={restoreWindow} />

      <div className="intro-hint pixel-text" aria-hidden="true">
        click a building to explore →
      </div>

      <CRTOverlay />

      {/* fallback for crawlers / screen readers / no-js: a plain list of posts */}
      <noscript>
        <div className="noscript-fallback">
          <h1>Blog</h1>
          <ul>
            {posts.map((p) => (
              <li key={p.slug}>
                <h2>{p.title}</h2>
                <p>{p.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </noscript>
    </div>
  );
}

export default App;
