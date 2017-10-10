import { GridCursor, GridLocation } from './grid';

export interface Cell extends Readonly<GridLocation> {
  readonly locked: boolean;
  value: number|null;
}

export interface Board {
  cursor: GridCursor;
  readonly cells: Cell[];
}

export interface Game {
  board: Board;
}
