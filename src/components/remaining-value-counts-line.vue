<template>
  <div
    :class="classes"
    class="row justify-space-between remaining-value-counts-line">
    <span class="remaining-value-counts-line__value m-r-40">
      {{value}}
    </span>
    <span class="right">
      <template v-if="noneRemaining">Complete!</template>
      <template v-else>{{remaining}} left</template>
    </span>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'remainingValueCountsLine',
    props: {
      value: {
        type: Number,
        required: true
      }
    },
    computed: {
      remaining(): number {
        return this.$store.getters.remaingValueOf(this.value);
      },
      noneRemaining(): boolean {
        return this.remaining === 0;
      },
      classes(): { [klass: string]: boolean } {
        return {
          'remaining-value-counts-line--matches-selected': this.$store.getters.selectedCellValue === this.value,
          'remaining-value-counts-line--complete': this.noneRemaining
        };
      }
    }
  });
</script>
