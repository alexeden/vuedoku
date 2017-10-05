import Vue from 'vue';
import Component from 'vue-class-component'


export class Square {
  index: number;
  constructor(
    public row: number,
    public col: number,
    public val: number|null
  ) {
    this.index = (9 * this.row) + col;
  }
}

@Component({
  props: {
    row: {
      type: Number,
      required: true
    },
    col: {
      type: Number,
      required: true
    },
    block: {
      type: Number,
      required: true
    }
  },
  template: `
    <div class="input-field col s4">
      <input id="" type="text">
      <label for="first_name">R {{row}}, C {{col}}, B {{block}}</label>
    </div>
  `
})
export default class SquareComponent extends Vue {
  constructor() {
    super();
  }
}
