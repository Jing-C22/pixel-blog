@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap");

:root {
  /* color tokens */
  --color-bg: #0d0a14;
  --color-bg-deep: #070510;
  --color-panel: #1a1530;
  --color-panel-light: #261f42;
  --color-border: #4ecdc4;
  --color-accent-pink: #ff6b9d;
  --color-accent-teal: #4ecdc4;
  --color-accent-yellow: #ffd23f;
  --color-text: #f0e6ff;
  --color-text-dim: #b6a9d6;
  --color-shadow: #05030a;

  /* type tokens */
  --font-pixel: "Press Start 2P", monospace;
  --font-mono: "VT323", monospace;

  /* layout tokens */
  --titlebar-h: 34px;
  --pixel-border: 4px;

  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-mono);
  overflow: hidden;
  image-rendering: pixelated;
  cursor: url("/sprites/cursor-default.svg") 4 4, auto;
}

button,
a,
[role="button"] {
  cursor: url("/sprites/cursor-pointer.svg") 6 2, pointer;
}

::selection {
  background: var(--color-accent-pink);
  color: var(--color-bg-deep);
}

/* utility: pixel-style border-image box used by windows / panels */
.pixel-panel {
  background: var(--color-panel);
  border: var(--pixel-border) solid var(--color-border);
  box-shadow:
    0 0 0 2px var(--color-bg-deep),
    6px 6px 0 0 var(--color-shadow);
  image-rendering: pixelated;
}

.pixel-text {
  font-family: var(--font-pixel);
  letter-spacing: 0.5px;
}

/* scrollbars themed to match */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent-teal) var(--color-panel);
}
*::-webkit-scrollbar {
  width: 10px;
}
*::-webkit-scrollbar-track {
  background: var(--color-panel);
}
*::-webkit-scrollbar-thumb {
  background: var(--color-accent-teal);
  border: 2px solid var(--color-panel);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
