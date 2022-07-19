# kt3klib v0.0.3

kt3klib is a collection of random independent modules.

## gameloop.ts

Runs the given function the specified times per second.

```ts
import { gameloop } from "https://deno.land/x/kt3klib@v0.0.3/gameloop.ts";

function main() {
  // your main routine
}

// Starts the main loop.
// `main` runs 60 times per second.
gameloop(main, 60);
```

## paul.ts

Frontend library.

TBD

## cl.ts

HTML class attribute utility. A fork of [clsx](https://github.com/lukeed/clsx).

```ts
import { cl } from "https://deno.land/x/kt3klib@v0.0.3/cl.ts";

// Strings (variadic)
cl("foo", true && "bar", "baz");
//=> 'foo bar baz'

// Objects
cl({ foo: true, bar: false, baz: isTrue() });
//=> 'foo baz'

// Objects (variadic)
cl({ foo: true }, { bar: false }, null, { "--foobar": "hello" });
//=> 'foo --foobar'

// Arrays
cl(["foo", 0, false, "bar"]);
//=> 'foo bar'

// Arrays (variadic)
cl(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]]);
//=> 'foo bar baz hello there'

// Kitchen sink (with nesting)
cl("foo", [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]], "cya");
//=> 'foo bar hello world cya'
```

# License

MIT
