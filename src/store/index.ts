import Vue from 'vue';
import Vuex from 'vuex';

import { storeObject } from './store';

Vue.use(Vuex);

export const store = new Vuex.Store(storeObject);


export * from './state';
export * from './store';
