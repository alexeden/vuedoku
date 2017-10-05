// import Vue from 'vue';
import { mapState } from 'vuex';
import SquareComponent from './square.component';
import { State, store } from './store';

export default {
  components: {
    square: SquareComponent
  },

  data() {
    return {
      board: [
        0, 0, 0,  0, 0, 0,  0, 0, 0,
        0, 0, 0,  0, 0, 0,  0, 0, 0,
        0, 0, 0,  0, 0, 0,  0, 0, 0,

        0, 0, 0,  0, 0, 0,  0, 0, 0,
        0, 0, 0,  0, 0, 0,  0, 0, 0,
        0, 0, 0,  0, 0, 0,  0, 0, 0,

        0, 0, 0,  0, 0, 0,  0, 0, 0,
        0, 0, 0,  0, 0, 0,  0, 0, 0,
        0, 0, 0,  0, 0, 0,  0, 0, 0
      ]
    };
  },

  computed: {
    ...mapState<State>({
      x: state => state.x,
      y: state => state.y
    })
  },

  template: `
    <form class="row">
      <div class="col s12" @click="move()">
        X {{x}}
        Y {{y}}
      </div>
      <div v-for="(row, rowIndex) in chunkify(9, board)" class="row">
        <div v-for="(block, subBlockIndex) in chunkify(3, row)" class="col s4">
          <div v-for="(square, squareIndex) in block">
            <square
              :row="rowIndex"
              :col="(3 * subBlockIndex) + squareIndex"
              :block="(rowIndex - rowIndex % 3) + subBlockIndex">
            </square>
          </div>
        </div>
      </div>
    </form>
  `,

  methods: {
    move(x: number, y: number) {
      store.commit('left');
    },

    chunkify<T>(size: number, list: T[]): T[][] {
      return list.length > 0
        ? [ list.slice(0, size), ...this.chunkify(size, list.slice(size))]
        : [ list ];
    }
  }
};
