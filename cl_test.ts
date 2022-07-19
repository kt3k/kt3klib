// Copyright 2022 Yoshiya Hinosawa. All rights reserved. MIT license.
// Copyright 2019-2022 Luke Edwards. All rights reserved. MIT license.

// Ported from `classnames` for compatibility checks.

import { assertEquals } from "https://deno.land/std@0.148.0/testing/asserts.ts";
import { cl } from "./cl.ts";

Deno.test("(compat) keeps object keys with truthy values", () => {
  const out = cl({ a: true, b: false, c: 0, d: null, e: undefined, f: 1 });
  assertEquals(out, "a f");
});

Deno.test("(compat) joins arrays of class names and ignore falsy values", () => {
  const out = cl("a", 0, null, undefined, true, 1, "b");
  assertEquals(out, "a 1 b");
});

Deno.test("(compat) supports heterogenous arguments", () => {
  assertEquals(cl({ a: true }, "b", 0), "a b");
});

Deno.test("(compat) should be trimmed", () => {
  assertEquals(cl("", "b", {}, ""), "b");
});

Deno.test("(compat) returns an empty string for an empty configuration", () => {
  assertEquals(cl({}), "");
});

Deno.test("(compat) supports an array of class names", () => {
  assertEquals(cl(["a", "b"]), "a b");
});

Deno.test("(compat) joins array arguments with string arguments", () => {
  assertEquals(cl(["a", "b"], "c"), "a b c");
  assertEquals(cl("c", ["a", "b"]), "c a b");
});

Deno.test("(compat) handles multiple array arguments", () => {
  assertEquals(cl(["a", "b"], ["c", "d"]), "a b c d");
});

Deno.test("(compat) handles arrays that include falsy and true values", () => {
  assertEquals(cl(["a", 0, null, undefined, false, true, "b"]), "a b");
});

Deno.test("(compat) handles arrays that include arrays", () => {
  assertEquals(cl(["a", ["b", "c"]]), "a b c");
});

Deno.test("(compat) handles arrays that include objects", () => {
  assertEquals(cl(["a", { b: true, c: false }]), "a b");
});

Deno.test("(compat) handles deep array recursion", () => {
  assertEquals(cl(["a", ["b", ["c", { d: true }]]]), "a b c d");
});

Deno.test("(compat) handles arrays that are empty", () => {
  assertEquals(cl("a", []), "a");
});

Deno.test("(compat) handles nested arrays that have empty nested arrays", () => {
  assertEquals(cl("a", [[]]), "a");
});

Deno.test("(compat) handles all types of truthy and falsy property values as expected", () => {
  const out = cl({
    // falsy:
    null: null,
    emptyString: "",
    noNumber: NaN,
    zero: 0,
    negativeZero: -0,
    false: false,
    undefined: undefined,

    // truthy (literally anything else):
    nonEmptyString: "foobar",
    whitespace: " ",
    function: Object.prototype.toString,
    emptyObject: {},
    nonEmptyObject: { a: 1, b: 2 },
    emptyList: [],
    nonEmptyList: [1, 2, 3],
    greaterZero: 1,
  });

  assertEquals(
    out,
    "nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero",
  );
});
