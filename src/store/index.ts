import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const initState = {
  x: 0,
  y: 0
};
export type State = typeof initState;

export const storeObject: Vuex.StoreOptions<typeof initState> = {
  state: initState,
  mutations: {
    left(state) {
      const x2 = state.x - 1;
      state.x = x2 >= 0 ? x2 : 8;
    }
  }
};

export const store = new Vuex.Store(storeObject);
