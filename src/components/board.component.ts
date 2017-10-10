import Vue from 'vue';
import { mapState } from 'vuex';
import { State } from 'sudoku/store';
import { Cell } from 'sudoku/lib';
import { CellComponent } from './cell.component';

interface BoardComponent extends Vue {
  chunkify<T>(size: number, list: T[]): T[][];
  cells: Cell[];
}

export const BoardComponent: Vue.ComponentOptions<BoardComponent> = {
  components: {
    cell: CellComponent
  },

  template: `
    <div class="sudoku-board">
      <div
        v-for="(nonet, nonetIndex) in nonets"
        :key="nonetIndex"
        :class="'sudoku-board__nonet--' + nonetIndex"
        class="sudoku-board__nonet">
        <div
          v-for="cell in nonet"
          :key="cell.index"
          class="sudoku-board__cell-wrapper">
          <cell :cell="cell" v-bind="cell"/>
        </div>
      </div>

    </div>
  `,
  computed: {
    ...mapState({
      cells: (state: State) => state.board.cells,
      cursor: (state: State) => state.board.cursor
    }),
    nonets(): Cell[][] {
      const indexedNonets: {[nonet: number]: Cell[]}
        = this.cells
            .reduce(
              (obj, cell) => ({
                ...obj,
                [cell.nonet]: (obj[cell.nonet] || []).concat(cell)
              }),
              {}
            );

      return Object.keys(indexedNonets)
        .sort()
        .map(index => indexedNonets[index]);
    }
  },
  methods: {
    chunkify<T>(this: BoardComponent, size: number, list: T[]): T[][] {
      return list.length > 0
        ? [ list.slice(0, size), ...this.chunkify(size, list.slice(size))]
        : [ list ];
    }
  }
};
