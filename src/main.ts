import Vue from 'vue';
// import Vuex from 'vuex';
import { store } from './store';
import BoardComponent from './board.component';

// Vue.use(Vuex);

const app = new Vue({
  el: '#app',
  // store: new Vuex.Store(store),
  store,
  components: {
    board: BoardComponent
  },
  template: `
    <board></board>
  `
});

Object.defineProperty(window, 'app', {
  value: app
});
