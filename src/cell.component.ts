import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';

export const CellComponent: Vue.ComponentOptions<any> = {
  props: {
    row: { type: Number, required: true },
    col: { type: Number, required: true },
    nonet: { type: Number, required: true },
    value: { type: Number }
  },
  data() {
    return {
      // value: null
    };
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
        //  ...args: any[]) {
        return this.nonet === nonet;
      }
    }),
    cellCssClasses() {
      return {
        'row-selected': this.rowSelected,
        'col-selected': this.colSelected,
        'nonet-selected': this.nonetSelected,
        'selected': this.selected
      };
    },

    index() {
      return (this.row * 9) + this.col;
    }
  },

  methods: {
    ...mapMutations([
      'left',
      'right',
      'up',
      'down',
      'setCursor'
    ]),
    onCellClick() {
      console.log(this);
      this.$store.commit({
        type: 'setCursor',
        row: this.row,
        col: this.col
      });
    }
  },
  template: `
    <div
      :id="'cell-'+index"
      :class="cellCssClasses"
      @click="onCellClick"
      class="col s4 sudoku-cell">
      <span class="sudoku-cell__value">{{value}}</span>
    </div>
  `
  // @keydown.right.prevent="right"
  // @keydown.up.prevent="up"
  // @keydown.prevent="onkeydown"
  // @keydown.down.prevent="down"
};
