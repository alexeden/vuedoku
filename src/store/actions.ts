import { ActionTree } from 'vuex';
import { State } from './state';


export const actions: ActionTree<State, State> = {
  handleKeyDown({commit, getters}, e: KeyboardEvent) {
    if (e.metaKey) return;
    e.preventDefault();

    switch(e.keyCode) {
      case 9:   // tab
        commit(e.shiftKey ? 'left': 'right');
        break;
      case 37:  // left arrow
        commit('left');
        break;
      case 38:  // up arrow
        commit('up');
        break;
      case 39:  // right arrow
        commit('right');
        break;
      case 40:  // down arrow
        commit('down');
        break;
      case 49:  // 1
      case 50:  // 2
      case 51:  // 3
      case 52:  // 4
      case 53:  // 5
      case 54:  // 6
      case 55:  // 7
      case 56:  // 8
      case 57:  // 9
        commit('setCellValue', {
          cell: getters.selectedCell,
          value: +e.key
        });
        break;
      case 8:   // backspace
      case 46:  // delete
        commit('setCellValue', {
          cell: getters.selectedCell,
          value: null
        });
        break;
    }
  }
};
