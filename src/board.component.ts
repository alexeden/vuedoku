import Vue from 'vue';
// import { mapState } from 'vuex';
import { CellComponent } from './cell.component';
// import { State } from './store';


export const BoardComponent: Vue.ComponentOptions<any> = {
  components: {
    cell: CellComponent
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

  // computed: {
  //   ...mapState<State>({
  //     x: state => state.x,
  //     y: state => state.y
  //   })
  // },

  template: `
    <form class="row">
      <div v-for="(row, rowIndex) in chunkify(9, board)" class="row">
        <div v-for="(block, subBlockIndex) in chunkify(3, row)" class="col s4">
          <div v-for="(square, squareIndex) in block">
            <cell
              :row="rowIndex"
              :col="(3 * subBlockIndex) + squareIndex"
              :nonet="(rowIndex - rowIndex % 3) + subBlockIndex">
            </cell>
          </div>
        </div>
      </div>
    </form>
  `,

  methods: {
    chunkify<T>(size: number, list: T[]): T[][] {
      return list.length > 0
        ? [ list.slice(0, size), ...this.chunkify(size, list.slice(size))]
        : [ list ];
    }
  }
};
