import Vuex from 'vuex';
import { createGame, State } from './state';

// const initState = {
//   cursor: {
//     col: 0,
//     row: 0,
//     nonet: 0
//   }
// };

// const updateNonet =
//   (cursor: typeof initState.cursor): typeof initState.cursor => {
//     const {row, col} = cursor;
//     return {
//       ...cursor,
//       nonet: (col - col % 3)/3 + (row - row % 3)
//     };
//   };

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
      // if ([37, 38, 39, 40].includes(e.keyCode
    }
  },

  getters: {
    nonet({cursor: {row, col}}) {
      return (row - row % 3);
    }
  },
  mutations: {
    setCursor({board}, {row, col}) {
      board.cursor = board.cursor.set(row, col);
    },
    left({board}) {
      board.cursor = board.cursor.left();
      // const nextCol = state.cursor.col - 1;
      // state.cursor = updateNonet({
      //   ...state.cursor,
      //   col: nextCol >= 0 ? nextCol : 8
      // });
    },
    right({ board }) {
      board.cursor = board.cursor.right();
      // state.cursor = updateNonet({
      //   ...state.cursor,
      //   col: (state.cursor.col + 1) % 8
      // });
    },
    up({ board }) {
      board.cursor = board.cursor.up();
      // const nextRow = state.cursor.row - 1;
      // state.cursor = updateNonet({
      //   ...state.cursor,
      //   row: nextRow >= 0 ? nextRow : 8
      // });
    },
    down({ board }) {
      board.cursor = board.cursor.down();
      // state.cursor = updateNonet({
      //   ...state.cursor,
      //   row: (state.cursor.row + 1) % 8
      // });
    }
  }
};
