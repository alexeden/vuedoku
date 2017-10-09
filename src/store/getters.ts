import { GetterTree } from 'vuex';
import { Cell } from './core';
import { State } from './state';


export const getters: GetterTree<State, State> = {
  selectedCell: ({ board: {cursor, cells} }): Cell => cells.find(cell => cursor.is(cell))!,
  impossibleValues: ({board: {cells}}) =>
    (cell: Cell): number[] =>
      cell.value
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9]
        : Array.from(new Set([
            ...cells
              .filter(c =>
                c.col === cell.col
                || c.row === cell.row
                || c.nonet === cell.nonet
              )
              .filter(c => typeof c.value === 'number')
              .map(c => c.value as number)
          ])),
  possibleCellValues: ({board: {cells}}, {impossibleValues}) =>
    (cell: Cell): number[] =>
      [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(value =>
        !impossibleValues(cell).includes(value)
      )
};
