
export const chunkify =
  <T>(size: number, list: T[]): T[][] => {
    return list.length > 0
      ? [ list.slice(0, size), ...chunkify(size, list.slice(size))]
      : [ list ];
  };
