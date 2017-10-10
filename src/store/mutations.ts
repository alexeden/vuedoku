import { MutationTree } from 'vuex';
import { Cell } from 'sudoku/lib';
import { State } from './state';


export const mutations: MutationTree<State> = {
  setCellValue(state, {cell, value}: {cell: Cell, value: number}) {
    if (cell.locked) return;

    cell.value = cell.value === value ? null : value;
  },
  setCursor: ({ board }, { row, col }) => board.cursor = board.cursor.set(row, col),
  left: ({ board }) => board.cursor = board.cursor.left(),
  right: ({ board }) => board.cursor = board.cursor.right(),
  up: ({ board }) => board.cursor = board.cursor.up(),
  down: ({ board }) => board.cursor = board.cursor.down()
};
