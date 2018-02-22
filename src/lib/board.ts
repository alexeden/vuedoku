import { chunkify, flatten } from '../utils';
import { GridCursor } from './grid';
import { Cell } from './cell';

export interface Board {
  cursor: GridCursor;
  readonly cells: Cell[];
}

export const createBoard = (values: number[]): Board => {
  // Convert each number into an object
  const indexed
    = values
        .map(value => value !== 0 ? value : null)
        .map(value => ({ value, locked: !!value }));

  // Chunk the values into rows of 9
  const rows
    = chunkify(9, indexed).map((partialCells, row) =>
        partialCells.map((cell, col): Cell => ({
          ...cell,
          ...GridCursor.of(row, col).toCellLocation()
        }))
      );

  // Flatten the rows
  return {
    cells: flatten(rows),
    cursor: GridCursor.of()
  };
};
