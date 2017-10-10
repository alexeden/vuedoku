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
    classes() {
      return {
        'remaining-value-counts__line--matches-selected': this.$store.getters.selectedCell.value === this.value
      };
    }
  },

  template: `
    <div
      :class="classes"
      class="clearfix remaining-value-counts__line">
      {{value}} <span class="right">{{remaining}} left</span>
    </div>
  `
};
