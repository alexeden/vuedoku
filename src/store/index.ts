import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const initState = {
  cursor: {
    col: 0,
    row: 0,
    nonet: 0
  }
};

export type State = typeof initState;

const updateNonet =
  (cursor: typeof initState.cursor): typeof initState.cursor => {
    return {
      ...cursor,
      nonet: 0
    };
  };

export const storeObject: Vuex.StoreOptions<typeof initState> = {
  state: initState,

  getters: {
    nonet({cursor: {row, col}}) {
      return (row - row % 3);
    }
  },
  mutations: {
    left(state) {
      const nextCol = state.cursor.col - 1;
      state.cursor = updateNonet({
        ...state.cursor,
        col: nextCol >= 0 ? nextCol : 8
      });
    },
    right(state) {
      state.cursor = updateNonet({
        ...state.cursor,
        col: (state.cursor.col + 1) % 8
      });
    },
    up(state) {
      const nextRow = state.cursor.row - 1;
      state.cursor = updateNonet({
        ...state.cursor,
        row: nextRow >= 0 ? nextRow : 8
      });
    },
    down(state) {
      state.cursor = updateNonet({
        ...state.cursor,
        row: (state.cursor.row + 1) % 8
      });
    }
  }
};

export const store = new Vuex.Store(storeObject);
