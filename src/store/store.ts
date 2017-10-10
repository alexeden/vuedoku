import { StoreOptions } from 'vuex';
import { createGame, State } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const storeObject: StoreOptions<State> = {
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
  actions,
  getters,
  mutations
};
