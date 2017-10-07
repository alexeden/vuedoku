import Vuex from 'vuex';
import { createGame, State, Cell } from './state';

export const storeObject: Vuex.StoreOptions<State> = {
  state: createGame([
    0, 8, 4,  0, 0, 3,  9, 0, 0,
    0, 7, 0,  5, 1, 0,  0, 4, 8,
    5, 0, 0,  0, 0, 0,  0, 0, 2,

    3, 0, 0,  0, 9, 0,  0, 2, 0,
    0, 4, 0,  6, 0, 1,  0, 9, 0,
    0, 1, 0,  0, 4, 0,  0, 0, 5,

    6, 0, 0,  0, 0, 0,  0, 0, 1,
    4, 2, 0,  0, 7, 6,  0, 3, 0,
    0, 0, 3,  1, 0, 0,  4, 8, 0
  ]),

  actions: {
    handleKeyDown({commit}, e: KeyboardEvent) {
      console.log('handleKeyDown: ', e);
      e.preventDefault();
      switch(e.keyCode) {
        case 37:
          commit('left');
          break;
        case 38:
          commit('up');
          break;
        case 39:
          commit('right');
          break;
        case 40:
          commit('down');
          break;
      }
    }
  },

  getters: {
    selectedCell({ board: {cursor, cells} }): Cell {
      return cells.find(cell => cursor.is(cell))!;
    },
    nonet({cursor: {row, col}}) {
      return (row - row % 3);
    }
  },
  mutations: {
    setCursor: ({ board }, { row, col }) => board.cursor = board.cursor.set(row, col),
    left: ({ board }) => board.cursor = board.cursor.left(),
    right: ({ board }) => board.cursor = board.cursor.right(),
    up: ({ board }) => board.cursor = board.cursor.up(),
    down: ({ board }) => board.cursor = board.cursor.down()
  }
};
