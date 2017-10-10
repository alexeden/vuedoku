import Vue from 'vue';
import { mapState } from 'vuex';
import { State } from 'sudoku/store';
import { Cell } from 'sudoku/lib';
import { CellComponent } from './cell.component';

interface BoardComponent extends Vue {
  cells: Cell[];
}

export const BoardComponent: Vue.ComponentOptions<BoardComponent> = {
  components: {
    cell: CellComponent
  },

  template: `
    <div class="sudoku-board flex flex-wrap">
      <div
        v-for="(nonet, nonetIndex) in nonets"
        :key="nonetIndex"
        :class="'sudoku-board__nonet--' + nonetIndex"
        class="col-4 flex-wrap flex sudoku-board__nonet">
        <div
          v-for="cell in nonet"
          :key="cell.index"
          class="col-4 flex items-center sudoku-board__cell-wrapper">
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
  }
};
