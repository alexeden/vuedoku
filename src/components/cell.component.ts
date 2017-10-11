import Vue from 'vue';
import { mapState } from 'vuex';
import { State } from 'sudoku/store';

export const CellComponent: Vue.ComponentOptions<any> = {
  props: {
    row: { type: Number, required: true },
    index: { type: Number, required: true },
    col: { type: Number, required: true },
    nonet: { type: Number, required: true },
    locked: { type: Boolean, required: true },
    value: { type: Number }
  },
  computed: {

    ...mapState({
      selected(this: any, {board: {cursor}}: State) {
        return this.col === cursor.col && this.row === cursor.row;
      },
      rowSelected(this: any, {board: {cursor}}: State) {
        return this.row === cursor.row;
      },
      colSelected(this: any, {board: {cursor}}: State) {
        return this.col === cursor.col;
      },
      nonetSelected(this: any, {board: {cursor}}: State) {
        return this.nonet === cursor.nonet;
      }
    }),

    possibleCellValues() {
      return this.$store.getters.possibleCellValueFinder(this);
    },

    hasImpossibleValue() {
      return this.$store.getters.impossibleValues(this).includes(this.value);
    },

    cellCssClasses() {
      return {
        'sudoku-cell--locked': this.locked,
        'sudoku-cell--row-selected': this.rowSelected,
        'sudoku-cell--col-selected': this.colSelected,
        'sudoku-cell--nonet-selected': this.nonetSelected,
        'sudoku-cell--selected': this.selected,
        'sudoku-cell--impossible': this.hasImpossibleValue,
        'sudoku-cell--matches-selected': this.$store.getters.selectedCell.value === this.value,
        'sudoku-cell--value-is-complete': this.$store.getters.valueIsComplete(this.value)
        // this.$store.getters.selectedCell.value === this.value

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
  },
  template: `
    <div
      :class="cellCssClasses"
      @click="onCellClick"
      class="sudoku-cell self-center">
      {{value}}
    </div>
  `
};
