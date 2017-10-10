import { chunkify, flatten } from '../utils';
import { Game, GridCursor, Cell } from 'sudoku/lib';

export type State = Game;

export const createGame =
  (values: number[]): Game => {
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
    const cells = flatten(rows);
    const cursor = GridCursor.of();

    return {
      board: {
        cells,
        cursor
      }
    };
  };
