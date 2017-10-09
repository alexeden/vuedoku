import Vue from 'vue';
import { mapState } from 'vuex';
import { CellComponent } from './cell.component';
// import { State } from './store';

interface BoardComponent extends Vue {
  chunkify<T>(size: number, list: T[]): T[][];
}

export const BoardComponent: Vue.ComponentOptions<BoardComponent> = {
  components: {
    cell: CellComponent
  },

  template: `
    <div class="container board">
      <div v-for="row in chunkify(9, board)" class="row my-0 py-0">
        <div v-for="subRow in chunkify(3, row)" class="col s4 px-0">
          <div class="col s4 cell-wrapper" v-for="cell in subRow">
            <cell :cell="cell" v-bind="cell"/>
          </div>
        </div>
      </div>
    </div>
  `,

  computed: {
    ...mapState({
      board: (state: any) => state.board.cells,
      cursor: (state: any) => state.board.cursor
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
