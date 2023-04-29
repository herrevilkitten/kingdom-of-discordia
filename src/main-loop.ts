const LOOPS_PER_SECOND = 4;
const LOOP_INTERVAL = 1000 / LOOPS_PER_SECOND;

export function mainLoop() {
  let isInLoop = false;
  const interval = setInterval(() => {
    if (isInLoop) {
      return;
    }
    isInLoop = true;

    isInLoop = false;
  }, LOOP_INTERVAL);
}