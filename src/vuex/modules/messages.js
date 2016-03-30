import { LOAD_MESSAGES } from '../mutation-types';

const state = {
  all: [],
  search: []
};

const mutations = {
  [LOAD_MESSAGES] (state, messages) {
    state.all = messages;
  }
};

export default {
  state,
  mutations
}