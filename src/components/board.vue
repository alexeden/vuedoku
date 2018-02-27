<template>
  <div class="row fill align-center justify-space-between p-10 gap-20">
    <remaining-value-counts/>
    <div class="sudoku-board row wrap">
      <div
        v-for="(nonet, nonetIndex) in nonets"
        :key="nonetIndex"
        :class="'sudoku-board__nonet--' + nonetIndex"
        class="no-grow row wrap sudoku-board__nonet">
        <div
          v-for="(cell, cellIndex) in nonet"
          :key="cell.index"
          :class="'sudoku-board__cell-wrapper--'+cellIndex"
          class="no-grow row align-items-center sudoku-board__cell-wrapper">
          <cell :cell="cell" v-bind="cell"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Cell, GridCursor } from 'sudoku/lib';
  import CellComponent from './cell';
  import RemainingValueCountsComponent from './remaining-value-counts';

  export default Vue.extend({
    name: 'board',
    components: {
      cell: CellComponent,
      remainingValueCounts: RemainingValueCountsComponent
    },
    props: {
      // The game's initial value
      value: {
        required: false,
        type: Number
      }
    },
    computed: {
      cells(): Cell[] {
        return this.$store.state.board.cells;
      },

      cursor(): GridCursor {
        return this.$store.state.board.cursor;
      },
      /* @description: Returns the cells nested by nonets  */
      nonets(): Cell[][] {
        const indexedNonets: {[nonet: number]: Cell[]}
          = this.cells.reduce((obj, cell) => ({
              ...obj,
              [cell.nonet]: (obj[cell.nonet] || []).concat(cell)
            }), {});

        return Object.keys(indexedNonets)
          .sort()
          .map(index => indexedNonets[index]);
      }
    }
  });
</script>
