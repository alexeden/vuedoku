<template>
  <div class="flex justify-around fit py3">
    <div class="col-3">
      <remaining-value-counts/>
    </div>
    <div class="flex max-width-3">
      <div class="sudoku-board flex flex-wrap">
        <div
          v-for="(nonet, nonetIndex) in nonets"
          :key="nonetIndex"
          :class="'sudoku-board__nonet--' + nonetIndex"
          class="col-4 flex-wrap flex sudoku-board__nonet">
          <div
            v-for="(cell, cellIndex) in nonet"
            :key="cell.index"
            :class="'sudoku-board__cell-wrapper--'+cellIndex"
            class="col-4 flex items-center sudoku-board__cell-wrapper">
            <cell :cell="cell" v-bind="cell"/>
          </div>
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

<documentation>
Hello, documentation 1!
</documentation>
<documentation>
Hello, documentation 2!
</documentation>
