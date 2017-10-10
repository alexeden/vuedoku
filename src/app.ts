import Vue from 'vue';
import { store } from './store';
import { BoardComponent } from './components';

Vue.filter('join', <T>(list: T[], separator = ' '): string => {
  if (!Array.isArray(list)) {
    throw new Error(`The "join" filter expects data to be an Array!`);
  }
  return list.join(separator);
});

const app = new Vue({
  el: '#app',
  filters: {
    join<T>(list: T[], separator = ' '): string {
      if (!Array.isArray(list)) {
        throw new Error(`The "join" filter expects data to be an Array!`);
      }
      return list.join(separator);
    }
  },
  store,
  mounted() {
    this.$el.parentElement!.addEventListener(
      'keydown',
      this.$store.dispatch.bind(this, 'handleKeyDown')
    );
  },
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
