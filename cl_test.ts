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

Deno.test("strings", () => {
  assertEquals(cl(""), "");
  assertEquals(cl("foo"), "foo");
  assertEquals(cl(true && "foo"), "foo");
  assertEquals(cl(false && "foo"), "");
});

Deno.test("strings (variadic)", () => {
  assertEquals(cl(""), "");
  assertEquals(cl("foo", "bar"), "foo bar");
  assertEquals(cl(true && "foo", false && "bar", "baz"), "foo baz");
  assertEquals(cl(false && "foo", "bar", "baz", ""), "bar baz");
});

Deno.test("objects", () => {
  assertEquals(cl({}), "");
  assertEquals(cl({ foo: true }), "foo");
  assertEquals(cl({ foo: true, bar: false }), "foo");
  assertEquals(cl({ foo: "hiya", bar: 1 }), "foo bar");
  assertEquals(cl({ foo: 1, bar: 0, baz: 1 }), "foo baz");
  assertEquals(cl({ "-foo": 1, "--bar": 1 }), "-foo --bar");
});

Deno.test("objects (variadic)", () => {
  assertEquals(cl({}, {}), "");
  assertEquals(cl({ foo: 1 }, { bar: 2 }), "foo bar");
  assertEquals(cl({ foo: 1 }, null, { baz: 1, bat: 0 }), "foo baz");
  assertEquals(
    cl({ foo: 1 }, {}, {}, { bar: "a" }, { baz: null, bat: Infinity }),
    "foo bar bat",
  );
});

Deno.test("arrays", () => {
  assertEquals(cl([]), "");
  assertEquals(cl(["foo"]), "foo");
  assertEquals(cl(["foo", "bar"]), "foo bar");
  assertEquals(cl(["foo", 0 && "bar", 1 && "baz"]), "foo baz");
});

Deno.test("arrays (nested)", () => {
  assertEquals(cl([[[]]]), "");
  assertEquals(cl([[["foo"]]]), "foo");
  assertEquals(cl([true, [["foo"]]]), "foo");
  assertEquals(cl(["foo", ["bar", ["", [["baz"]]]]]), "foo bar baz");
});

Deno.test("arrays (variadic)", () => {
  assertEquals(cl([], []), "");
  assertEquals(cl(["foo"], ["bar"]), "foo bar");
  assertEquals(cl(["foo"], null, ["baz", ""], true, "", []), "foo baz");
});

Deno.test("arrays (no `push` escape)", () => {
  assertEquals(cl({ push: 1 }), "push");
  assertEquals(cl({ pop: true }), "pop");
  assertEquals(cl({ push: true }), "push");
  assertEquals(cl("hello", { world: 1, push: true }), "hello world push");
});

Deno.test("functions", () => {
  const foo = () => {};
  assertEquals(cl(foo, "hello"), "hello");
  assertEquals(cl(foo, "hello", cl), "hello");
  assertEquals(cl(foo, "hello", [[cl], "world"]), "hello world");
});
