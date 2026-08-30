export const HOLD_MS = 1000;

export function holdFill(state: { holdFrom: number; solved: boolean }) {
  if (state.solved) return 1;
  if (!state.holdFrom) return 0;
  return Math.min(1, (performance.now() - state.holdFrom) / HOLD_MS);
}

type HoldState = {
  holding: boolean;
  holdFrom: number;
  solved: boolean;
};

export function createHoldWatch(onTick: () => void) {
  let tick: ReturnType<typeof setInterval> | null = null;

  function stop() {
    if (!tick) return;
    clearInterval(tick);
    tick = null;
  }

  return {
    stop,
    evaluate(state: HoldState, matched: boolean) {
      if (state.solved || !matched) {
        state.holding = false;
        state.holdFrom = 0;
        stop();
        return;
      }
      state.holding = true;
      const now = performance.now();
      if (!state.holdFrom) state.holdFrom = now;
      if (now - state.holdFrom >= HOLD_MS) {
        state.solved = true;
        state.holding = false;
        stop();
        return;
      }
      if (!tick) tick = setInterval(onTick, 80);
    },
  };
}
