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
  import { mapState } from 'vuex';
  import { State } from 'sudoku/store';

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
      ...mapState({
        selected(this: any, {board: {cursor}}: State) {
          return this.col === cursor.col && this.row === cursor.row;
        },
        zoneSelected(this: any, {board: {cursor}}: State) {
          return this.row === cursor.row || this.col === cursor.col || this.nonet === cursor.nonet;
        },
        matchesSelected(this: any, state, {selectedCell}) {
          return selectedCell.value === this.value;
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
