import { chunkify, flatten } from '../utils';

export interface CellLocation {
  index: number;
  col: number;
  row: number;
  nonet: number;
}

export interface Cell extends Readonly<CellLocation> {
  readonly locked: boolean;
  // guesses: number[];
  // possible: number[];
  // knowable: boolean;
  value: number;
}

export interface Board {
  cursor: BoardCursor;
  readonly cells: Cell[];
}

export interface Game extends Readonly<Board> {
  board: Board;
}

export type State = Game;

export class BoardCursor implements CellLocation {
  static of(row = 0, col = 0) {
    return new BoardCursor(
      (row + 9) % 9,
      (col + 9) % 9
    );
  }

  static from(loc: BoardCursor|CellLocation) {
    return BoardCursor.of(loc.row, loc.col);
  }

  private constructor(
    public readonly row: number,
    public readonly col: number
  ) {}

  is(loc: CellLocation): boolean {
    return this.index === loc.index;
  }

  left(): BoardCursor {
    return BoardCursor.of(this.row, this.col - 1);
  }

  right(): BoardCursor {
    return BoardCursor.of(this.row, this.col + 1);
  }

  up(): BoardCursor {
    return BoardCursor.of(this.row - 1, this.col);
  }

  down(): BoardCursor {
    return BoardCursor.of(this.row + 1, this.col);
  }

  setRow(row: number): BoardCursor {
    return BoardCursor.of(row, this.col);
  }

  setCol(col: number): BoardCursor {
    return BoardCursor.of(this.row, col);
  }

  set(row: number, col: number): BoardCursor {
    return BoardCursor.of(row, col);
  }

  get nonet(): number {
    return (this.col - this.col % 3)/3 + (this.row - this.row % 3);
  }

  get index(): number {
    return this.row * 9 + this.col;
  }
}

export const createGame =
  (values: number[]): Game => {
    // Convert each number into an object
    const indexed = values.map(value => ({ value, locked: value !== 0 }));

    // Chunk the values into rows of 9
    const rows
      = chunkify(9, indexed).map((partialCells, row) =>
          partialCells.map((cell, col): Cell => ({
            ...cell,
            ...BoardCursor.of(row, col)
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
