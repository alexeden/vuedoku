export const flatten =
  <T>(list: T[][]): T[] =>
    list.reduce(
      (accum, x) =>
        Array.isArray(x)
          ? [...accum, ...x]
          : [...accum, x],
      []
    );
