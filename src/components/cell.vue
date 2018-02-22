<template>
  <div
    :class="cellCssClasses"
    @click="onCellClick"
    class="sudoku-cell self-center">
    {{value}}
    <i v-if="locked && zoneSelected" class="material-icons sudoku-cell__lock">lock</i>
  </div>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from 'vue';
  import { GridCursor } from 'sudoku/lib';

  export default Vue.extend({
    props: {
      row: { type: Number, required: true },
      index: { type: Number, required: true },
      col: { type: Number, required: true },
      nonet: { type: Number, required: true },
      locked: { type: Boolean, required: true },
      value: { type: Number }
    },
    computed: {
      selected(): boolean {
        return this.col === this.cursor.col && this.row === this.cursor.row;
      },

      cursor(): GridCursor {
        return this.$store.state.board.cursor;
      },

      zoneSelected(): boolean {
        return this.row === this.cursor.row
          || this.col === this.cursor.col
          || this.nonet === this.cursor.nonet;
      },

      matchesSelected(): boolean {
        return this.selectedCellValue === this.value;
      },

      selectedCellValue(): number|null {
        return this.$store.getters.selectedCellValue;
      },

      possibleCellValues(): number[] {
        return this.$store.getters.possibleCellValueFinder(this);
      },

      hasImpossibleValue(): boolean {
        return this.$store.getters.impossibleValues(this).includes(this.value);
      },

      cellCssClasses(): { [klass: string]: boolean } {
        return {
          'sudoku-cell--locked': this.locked,
          'sudoku-cell--zone-selected': this.zoneSelected,
          'sudoku-cell--selected': this.selected,
          'sudoku-cell--impossible': this.hasImpossibleValue,
          'sudoku-cell--matches-selected': this.matchesSelected,
          'sudoku-cell--value-is-complete': this.$store.getters.valueIsComplete(this.value)
        };
      }
    },

    methods: {
      onCellClick() {
        this.$store.commit({
          type: 'setCursor',
          row: this.row,
          col: this.col
        });
      }
    }
  });
</script>
