import Vue from 'vue';
import { store } from './store';
import { BoardComponent, RemainingValueCountsComponent } from './components';

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
    board: BoardComponent,
    remainingValueCounts: RemainingValueCountsComponent
  },
  template: `
    <div class="flex justify-around fit">
      <div class="col-3">
        <remaining-value-counts/>
      </div>
      <div class="flex max-width-2">
        <board/>
      </div>
    </div>
  `
});

Object.defineProperty(window, 'app', {
  value: app
});
