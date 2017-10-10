import Vue from 'vue';
import Vuex from 'vuex';
import { createGame } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: createGame([
    1, 8, 4,  0, 0, 3,  9, 5, 0,
    0, 7, 0,  5, 1, 0,  0, 4, 8,
    5, 0, 0,  0, 0, 0,  0, 1, 2,

    3, 0, 0,  0, 9, 0,  1, 2, 4,
    0, 4, 0,  6, 0, 1,  0, 9, 0,
    0, 1, 0,  0, 4, 0,  0, 0, 5,

    6, 0, 0,  0, 0, 0,  0, 0, 1,
    4, 2, 1,  0, 7, 6,  0, 3, 9,
    0, 0, 3,  1, 0, 0,  4, 8, 6
  ]),
  actions,
  getters,
  mutations
});


export * from './state';
