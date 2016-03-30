import { LOAD_CHANNELS } from '../mutation-types';

const state = {
  all: []
};

const mutations = {
  [LOAD_CHANNELS] (state, channels) {
    state.all = channels;
  }
};

export default {
  state,
  mutations
}