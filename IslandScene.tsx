/**
 * A subtle CRT scanline + vignette overlay. Pure CSS, sits above everything
 * with pointer-events disabled so it never blocks interaction.
 */
export function CRTOverlay() {
  return (
    <div className="crt-overlay" aria-hidden="true">
      <div className="crt-scanlines" />
      <div className="crt-vignette" />
    </div>
  );
}
