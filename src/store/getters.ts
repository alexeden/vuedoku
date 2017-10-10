import { GetterTree } from 'vuex';
import { Cell } from 'sudoku/lib';
import { State } from './state';


export const getters: GetterTree<State, State> = {
  selectedCell: ({ board: {cursor, cells} }): Cell => cells.find(cell => cursor.is(cell))!,
  impossibleValues: ({board: {cells}}) =>
    (cell: Cell): number[] =>
      Array.from(new Set([
        ...cells
          /* Ignore the passed-in cell */
          .filter(c => c.index !== cell.index)
          .filter(c =>
            c.col === cell.col
            || c.row === cell.row
            || c.nonet === cell.nonet
          )
          .filter(c => typeof c.value === 'number')
          .map(c => c.value as number)
      ])),
  // collidesWithSelectedCell: (state, {selectedCell})
  hasImpossibleValue: (state, {impossibleValues}) =>
    (cell: Cell): boolean =>
      impossibleValues(cell).includes(cell.value),
  possibleCellValues: ({board: {cells}}, {impossibleValues}) =>
    (cell: Cell): number[] =>
      [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(value =>
        !impossibleValues(cell).includes(value)
      )
};
