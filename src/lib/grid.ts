export interface GridLocation {
  index: number;
  col: number;
  row: number;
  nonet: number;
}


export class GridCursor implements GridLocation {
  static of(row = 0, col = 0) {
    return new GridCursor(
      (row + 9) % 9,
      (col + 9) % 9
    );
  }

  static from(loc: GridCursor|GridLocation) {
    return GridCursor.of(loc.row, loc.col);
  }

  private constructor(
    public readonly row: number,
    public readonly col: number
  ) {}

  is(loc: GridLocation): boolean {
    return this.index === loc.index;
  }

  left(): GridCursor {
    return GridCursor.of(this.row, this.col - 1);
  }

  right(): GridCursor {
    return GridCursor.of(this.row, this.col + 1);
  }

  up(): GridCursor {
    return GridCursor.of(this.row - 1, this.col);
  }

  down(): GridCursor {
    return GridCursor.of(this.row + 1, this.col);
  }

  setRow(row: number): GridCursor {
    return GridCursor.of(row, this.col);
  }

  setCol(col: number): GridCursor {
    return GridCursor.of(this.row, col);
  }

  set(row: number, col: number): GridCursor {
    return GridCursor.of(row, col);
  }

  toCellLocation(): GridLocation {
    return {
      index: this.index,
      col: this.col,
      row: this.row,
      nonet: this.nonet
    };
  }

  get nonet(): number {
    return (this.col - this.col % 3)/3 + (this.row - this.row % 3);
  }

  get index(): number {
    return this.row * 9 + this.col;
  }
}
