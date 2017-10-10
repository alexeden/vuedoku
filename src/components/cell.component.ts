import Vue from 'vue';
import { mapMutations, mapState, mapGetters } from 'vuex';
import { State } from 'sudoku/store';

export const CellComponent: Vue.ComponentOptions<any> = {
  props: {
    row: { type: Number, required: true },
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

    ...mapGetters({
      possibleCellValueFinder: 'possibleCellValues'
    }),

    possibleCellValues() {
      return this.possibleCellValueFinder(this);
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
        'z-depth-3': this.selected,
        'z-depth-1': !this.selected && (this.rowSelected || this.colSelected || this.nonetSelected),
        'sudoku-cell--impossible': this.hasImpossibleValue,
        'sudoku-cell--matches-selected': this.$store.getters.selectedCell.value === this.value
      };
    },

    index() {
      return (this.row * 9) + this.col;
    }
  },

  methods: {
    ...mapMutations([ 'setCursor' ]),
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
