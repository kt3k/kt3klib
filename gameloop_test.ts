import { gameloop } from "./gameloop.ts";
import { assert, assertEquals } from "./test_deps.ts";

Deno.test("gameloop", async () => {
  let cnt = 0;
  const loop = gameloop(() => {
    cnt++;
  }, 30);

  setTimeout(() => {
    loop.stop();
  }, 1005);

  const run = loop.run();
  assert(loop.isRunning());
  await run;

  const x = cnt;
  // Game loop runs about 30 steps
  assert(cnt === 27 || cnt === 28 || cnt === 29 || cnt === 30);

  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

  // Game loop is stopped and main function is not executed
  assertEquals(cnt, x);

  {
    const loop = gameloop(() => {
      cnt++;
    }, 30);

    setTimeout(() => {
      loop.stop();
    }, 50);
    const res = await Promise.allSettled([loop.run(), loop.run()]);
    assertEquals(res[0].status, "fulfilled");
    assertEquals(res[1].status, "rejected");
  }
});
