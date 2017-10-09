import Vue from 'vue';
import { mapMutations, mapState, mapGetters } from 'vuex';
import {} from './store';

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
      selected(this: any, {cursor: {col, row}}) {
        return this.col === col && this.row === row;
      },
      rowSelected(this: any, {cursor: {row}}) {
        return this.row === row;
      },
      colSelected(this: any, {cursor: {col}}) {
        return this.col === col;
      },
      nonetSelected(this: any, {cursor: {nonet}}) {
        return this.nonet === nonet;
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
        'sudoku-cell--impossible': this.hasImpossibleValue
      };
    },

    index() {
      return (this.row * 9) + this.col;
    }
  },
  filters: {
    join<T>(list: T[], separator = ' '): string {
      if (!Array.isArray(list)) {
        throw new Error(`The "join" filter expects data to be an Array!`);
      }
      return list.join(separator);
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
      class="sudoku-cell">
      <span class="sudoku-cell__value">{{value}}</span>
    </div>
  `
  // <span class="sudoku-cell__guess">{{possibleCellValues | join('  ')}}</span>
};
