import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { Board, Cell, createBoard } from 'sudoku/lib';

export type State = {
  board: Board
};

const createState = (values: number[]): State => {
  return {
    board: createBoard(values)
  };
};

const getters: GetterTree<State, State> = {
  selectedCell: ({ board: {cursor, cells} }): Cell => cells.find(cell => cursor.is(cell))!,
  selectedCellValue: (state, {selectedCell}): number|null => selectedCell.value,
  impossibleValues: ({board: {cells}}) =>
    (cell: Cell): number[] => (
      Array.from(new Set([
        ...cells
          /* Ignore the passed-in cell */
          .filter(c =>
            typeof c.value === 'number'
            && c.index !== cell.index
            && (c.col === cell.col || c.row === cell.row || c.nonet === cell.nonet)
          )
          .map(c => c.value as number)
      ]))
    ),
  hasImpossibleValue: (state, {impossibleValues}) =>
    (cell: Cell): boolean => (
      impossibleValues(cell).includes(cell.value)
    ),
  possibleCellValues: ({board: {cells}}, {impossibleValues}) =>
    (cell: Cell): number[] => (
      [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(value =>
        !impossibleValues(cell).includes(value)
      )
    ),
  totalRemainingValues: ({board: {cells}}) =>
    cells.reduce((count, cell) => count - (!!cell.value ? 1 : 0), 81),


  remainingValueCounts: ({board: {cells}}): {[value: number]: number} => {
    const counts: { [value: number]: number } =
      [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
        (obj, value) => ({ ...obj, [value]: 9 }),
        {}
      );

    cells
      .filter(cell => !!cell.value)
      .map(cell => counts[cell.value!]--);

    return counts;
  },
  remaingValueOf: ({board: {cells}}) =>
    (value: number): number => (
      cells.reduce((count, cell) => count - (cell.value === value ? 1 : 0), 9)
    ),

  valueIsComplete: (state, {remaingValueOf}) =>
    (value: number): boolean => (
      remaingValueOf(value) < 1
    )
};


const actions: ActionTree<State, State> = {
  handleKeyDown(context, e: KeyboardEvent) {
    if (e.metaKey) return;
    e.preventDefault();

    switch(e.keyCode) {
      case 9:   // tab
        context.commit(e.shiftKey ? 'left': 'right');
        break;
      case 37:  // left arrow
        context.commit('left');
        break;
      case 38:  // up arrow
        context.commit('up');
        break;
      case 39:  // right arrow
        context.commit('right');
        break;
      case 40:  // down arrow
        context.commit('down');
        break;
      case 49:  // 1
      case 50:  // 2
      case 51:  // 3
      case 52:  // 4
      case 53:  // 5
      case 54:  // 6
      case 55:  // 7
      case 56:  // 8
      case 57:  // 9
        context.commit('setCellValue', {
          cell: context.getters.selectedCell,
          value: +e.key
        });
        break;
      case 8:   // backspace
      case 46:  // delete
        context.commit('setCellValue', {
          cell: context.getters.selectedCell,
          value: null
        });
        break;
    }
  }
};

const mutations: MutationTree<State> = {
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

export default {
  state: createState,
  getters,
  actions,
  mutations
};
