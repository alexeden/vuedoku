import Vue from 'vue';
import { mapGetters } from 'vuex';
import { RemainingValueCountsLineComponent } from './remaining-value-counts-line.component';

export const RemainingValueCountsComponent: Vue.ComponentOptions<any> = {
  components: {
    remainingValueCountsLine: RemainingValueCountsLineComponent
  },
  computed: {
    ...mapGetters(['totalRemainingValues'])
  },
  template: `
    <div class="remaining-value-counts">
      <remaining-value-counts-line v-for="n in 9" :key="n" :value="n"/>
      <p>{{totalRemainingValues}} cells left</p>
    </div>
  `
};
