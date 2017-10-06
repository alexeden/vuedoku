import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';

export const CellComponent: Vue.ComponentOptions<any> = {
  props: {
    row: { type: Number, required: true },
    col: { type: Number, required: true },
    nonet: { type: Number, required: true }
  },
  data() {
    return {
      value: null
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
    index() {
      return (this.row * 9) + this.col;
    }
  },
  methods: {
    ...mapMutations([
      'left',
      'right',
      'up',
      'down'
    ]),
    onkeydown(event: KeyboardEvent) {
      if (![ 49, 50, 51, 52, 53, 54, 55, 56, 57 ].includes(event.keyCode)) {
        return;
      }
      // const { target }: { target: HTMLInputElement } = event;
      this.value = +event.key;
    }
  },
  template: `
    <div class="input-field col s4">
      <input
        :id="'square-'+index"
        :value="value"
        type="text"
        @keydown.left.prevent="left"
        @keydown.right.prevent="right"
        @keydown.up.prevent="up"
        @keydown.down.prevent="down"
        @keydown.prevent="onkeydown"
        autocomplete="off">
      <label :for="'square-'+index">
        <template v-if="colSelected">C</template>
        <template v-if="rowSelected">R</template>
        <template v-if="nonetSelected">N</template>
        <template v-if="selected">SELECTED</template>
      </label>
    </div>
  `
};
