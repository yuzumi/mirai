import state from 'src/store/modules/notes/state';
import * as getters from 'src/store/modules/notes/getters';
import * as actions from 'src/store/modules/notes/actions';
import * as mutations from 'src/store/modules/notes/mutations';

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
