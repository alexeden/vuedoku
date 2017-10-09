import { chunkify, flatten } from '../utils';
import { Game, BoardCursor, Board, Cell } from './core';

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
            ...BoardCursor.of(row, col).toCellLocation()
          }))
        );

    // Flatten the rows
    const cells = flatten(rows);

    const board: Board = {
      cells,
      cursor: BoardCursor.of()
    };

    return {
      board,
      get cells() {
        return board.cells;
      },
      get cursor() {
        return board.cursor;
      }
    };
  };
