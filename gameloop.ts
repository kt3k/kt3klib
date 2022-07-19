// Copyright 2022 Yoshiya Hinosawa. All rights reserved. MIT license.

class Gameloop {
  main: () => void;
  timer?: number;
  frame: number;
  resolve?: () => void;
  constructor(main: () => void, fps: number) {
    this.main = main;
    this.frame = 1000 / fps;
  }

  /**
   * Starts the game loop.
   */
  run(): Promise<void> {
    if (this.resolve) {
      return Promise.reject(new Error("The gameloop is already running."));
    }
    return new Promise((resolve, _) => {
      this.resolve = resolve;
      this.step();
    });
  }

  /**
   * Returns true iff the loop is running.
   */
  isRunning(): boolean {
    return this.resolve != null;
  }

  /**
   * Performs the step routine.
   */
  step = (): void => {
    const startedAt = +new Date();
    this.main();
    const endedAt = +new Date();
    const wait = this.frame - (startedAt - endedAt);
    this.timer = setTimeout(this.step, wait);
  };

  /**
   * Stops the game loop.
   */
  stop(): void {
    if (!this.resolve) {
      console.warn("The gameloop isn't running.");
      return;
    }
    this.resolve();
    delete this.resolve;
    clearTimeout(this.timer);
  }
}

export function gameloop(main: () => void, fps: number) {
  return new Gameloop(main, fps);
}
