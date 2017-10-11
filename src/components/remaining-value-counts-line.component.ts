import Vue from 'vue';

export const RemainingValueCountsLineComponent: Vue.ComponentOptions<any> = {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    remaining() {
      return this.$store.getters.remaingValueOf(this.value);
    },
    noneRemaining() {
      return this.remaining === 0;
    },
    classes() {
      return {
        'remaining-value-counts-line--matches-selected': this.$store.getters.selectedCellValue === this.value,
        'remaining-value-counts-line--complete': this.noneRemaining
      };
    }
  },

  template: `
    <div
      :class="classes"
      class="clearfix remaining-value-counts-line">
      <span class="remaining-value-counts-line__value">
        {{value}}
      </span>
      <span class="right">
        <template v-if="noneRemaining">Complete!</template>
        <template v-else>{{remaining}} left</template>
      </span>
    </div>
  `
};
