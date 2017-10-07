import Vue from 'vue';
import { store } from './store';
import { BoardComponent } from './board.component';

const app = new Vue({
  el: '#app',
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
