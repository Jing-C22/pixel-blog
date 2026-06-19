import { useCallback, useRef, useState } from "react";

export interface WindowState {
  id: string;
  slug: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
  /** the screen point the window should animate FROM (the icon that opened it) */
  originX: number;
  originY: number;
}

let windowCounter = 0;

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zCounter = useRef(10);

  const openWindow = useCallback(
    (params: {
      slug: string;
      title: string;
      icon: string;
      originX: number;
      originY: number;
    }) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.slug === params.slug);
        if (existing) {
          zCounter.current += 1;
          return prev.map((w) =>
            w.slug === params.slug
              ? { ...w, z: zCounter.current, minimized: false }
              : w
          );
        }
        zCounter.current += 1;
        windowCounter += 1;
        const offset = (windowCounter % 6) * 24;
        const newWindow: WindowState = {
          id: `win-${windowCounter}-${params.slug}`,
          slug: params.slug,
          title: params.title,
          icon: params.icon,
          x: window.innerWidth / 2 - 260 + offset,
          y: window.innerHeight / 2 - 220 + offset,
          z: zCounter.current,
          minimized: false,
          originX: params.originX,
          originY: params.originY,
        };
        return [...prev, newWindow];
      });
    },
    []
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z } : w)));
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: false, z } : w))
    );
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    focusWindow,
    moveWindow,
  };
}
