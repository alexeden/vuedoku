import Vue from 'vue';
import { mapGetters } from 'vuex';
// import { State } from 'sudoku/store';

export const CellsRemainingComponent: Vue.ComponentOptions<any> = {
  computed: {
    ...mapGetters({
      remainingValueCounts: 'remainingValueCounts'
      // possibleCellValueFinder: 'possibleCellValues'
    }),
    valuesRemaining() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9]
        .map(value =>
          this.$store.getters.valuesRemaining(value)
        );
    }
  },

  methods: {
    trackRemainingValues(value: number) {
    }
  },

  template: `
    <div class="flex justify-around">
      <template v-for="(count, value) in remainingValueCounts">
        <div class="col">
          {{value}}: {{count}}
        </div>
      </template>
    </div>
  `
};
