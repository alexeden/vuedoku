import Vue from 'vue';
import Component from 'vue-class-component'

@Component({
  props: {
    row: { type: Number, required: true },
    col: { type: Number, required: true },
    block: { type: Number, required: true }
  },
  template: `
    <div class="input-field col s4">
      <input :id="'square-'+index" type="text">
      <label :for="'square-'+index">{{index}}</label>
    </div>
  `
})
export default class SquareComponent extends Vue {
  row: number;
  col: number;
  block: number;

  get index() {
    return (this.row * 9) + this.col;
  }
}
