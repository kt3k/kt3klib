// Copyright 2022 Yoshiya Hinosawa. All rights reserved. MIT license.
// Copyright 2019-2022 Luke Edwards. All rights reserved. MIT license.

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
// deno-lint-ignore no-explicit-any
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

// deno-lint-ignore no-explicit-any
function toVal(mix: any, k?: any, str = "", type = typeof mix) {
  if (type == "string" || type == "number") {
    str += mix;
  }
  if (type == "object") {
    for (k in mix) {
      if (
        mix[k] && (!Array.isArray(mix) || (k = toVal(mix[k])))
      ) {
        str && (str += " ");
        str += k;
      }
    }
  }
  return str;
}

export const cl = (...args: ClassValue[]) => toVal(args);
