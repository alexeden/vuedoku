import Vuex from 'vuex';

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
    const {row, col} = cursor;
    const colCalc = (col - col % 3)/3;
    const rowCalc = (row - row % 3);
    console.log(`col: ${col}, colCalc: `, colCalc);
    console.log(`row: ${row}, rowCalc: `, rowCalc);
    const nonet = rowCalc + colCalc;
    console.log('nonet: ', nonet);
    return {
      ...cursor,
      nonet
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
    setCursor(state, {row, col}) {
      state.cursor = updateNonet({ ...state.cursor, col, row });
    },
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
