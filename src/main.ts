import Vue from 'vue';
import BoardComponent from './board.component';

const app = new Vue({
  el: '#app',
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
