// Tiny synthesized 8-bit-style SFX via the Web Audio API.
// No audio files to host — everything is generated on the fly.

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

function blip(
  freq: number,
  duration: number,
  type: OscillatorType = "square",
  volume = 0.05,
  delay = 0
) {
  if (muted) return;
  const audioCtx = getCtx();
  if (!audioCtx) return;
  if (audioCtx.state === "suspended") audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;

  const startTime = audioCtx.currentTime + delay;
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

export const sfx = {
  open: () => {
    blip(440, 0.08, "square", 0.04);
    blip(660, 0.1, "square", 0.04, 0.06);
  },
  close: () => {
    blip(440, 0.08, "square", 0.04);
    blip(280, 0.1, "square", 0.04, 0.05);
  },
  hover: () => blip(880, 0.04, "square", 0.02),
  click: () => blip(520, 0.05, "square", 0.035),
  drag: () => blip(330, 0.03, "triangle", 0.015),
  toggleMute: (nowMuted: boolean) => {
    if (!nowMuted) blip(660, 0.06, "square", 0.04);
  },
};

export function setMuted(value: boolean) {
  muted = value;
}

export function isMuted() {
  return muted;
}
