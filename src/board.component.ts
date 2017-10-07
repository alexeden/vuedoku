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
        0, 8, 4,  0, 0, 3,  9, 0, 0,
        0, 7, 0,  5, 1, 0,  0, 4, 8,
        5, 0, 0,  0, 0, 0,  0, 0, 2,

        3, 0, 0,  0, 9, 0,  0, 2, 0,
        0, 4, 0,  6, 0, 1,  0, 9, 0,
        0, 1, 0,  0, 4, 0,  0, 0, 5,

        6, 0, 0,  0, 0, 0,  0, 0, 1,
        4, 2, 0,  0, 7, 6,  0, 3, 0,
        0, 0, 3,  1, 0, 0,  4, 8, 0
      ]
    };
  },

  template: `
    <div class="container">
      <div v-for="(row, rowIndex) in chunkify(9, board)" class="row my-0 py-0">
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
    </div>
  `,

  methods: {
    chunkify<T>(size: number, list: T[]): T[][] {
      return list.length > 0
        ? [ list.slice(0, size), ...this.chunkify(size, list.slice(size))]
        : [ list ];
    }
  }
};
