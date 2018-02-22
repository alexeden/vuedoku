import Vue from 'vue';
import Vuex from 'vuex';
import game from './module.game';

const {
 state,
 getters,
 actions,
 mutations
} = game;

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: state([
    1, 8, 4,  2, 6, 3,  9, 5, 7,
    2, 7, 6,  5, 1, 0,  3, 4, 8,
    5, 3, 0,  0, 8, 7,  6, 1, 2,

    3, 6, 5,  7, 9, 8,  1, 2, 4,
    0, 4, 0,  6, 5, 1,  0, 9, 3,
    0, 1, 0,  3, 4, 2,  0, 6, 5,

    6, 0, 8,  0, 3, 0,  2, 7, 1,
    4, 2, 1,  8, 7, 6,  5, 3, 9,
    7, 0, 3,  1, 2, 0,  4, 8, 6
  ]),
  actions,
  getters,
  mutations
});
