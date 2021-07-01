import state from 'src/store/modules/tasks/state';
import * as getters from 'src/store/modules/tasks/getters';
import * as actions from 'src/store/modules/tasks/actions';
import * as mutations from 'src/store/modules/tasks/mutations';

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
