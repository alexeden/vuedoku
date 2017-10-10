import Vue from 'vue';
import { mapState } from 'vuex';
import { State } from 'sudoku/store';
import { CellComponent } from './cell.component';

interface BoardComponent extends Vue {
  chunkify<T>(size: number, list: T[]): T[][];
}

export const BoardComponent: Vue.ComponentOptions<BoardComponent> = {
  components: {
    cell: CellComponent
  },

  template: `
    <div class="sudoku-board">
      <div v-for="row in chunkify(9, board)" class="sudoku-board__row">
        <div class="sudoku-board__cell-wrapper" v-for="cell in row">
          <cell :cell="cell" v-bind="cell"/>
        </div>
      </div>
    </div>
  `,
  computed: {
    ...mapState({
      board: (state: State) => state.board.cells,
      cursor: (state: State) => state.board.cursor
    })
  },
  methods: {
    chunkify<T>(this: BoardComponent, size: number, list: T[]): T[][] {
      return list.length > 0
        ? [ list.slice(0, size), ...this.chunkify(size, list.slice(size))]
        : [ list ];
    }
  }
};
