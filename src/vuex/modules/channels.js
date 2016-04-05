import {
  LOAD_CHANNELS,
  SET_CURRENT_CHANNEL
} from '../mutation-types';

const state = {
  all: [],
  current: null
};

const mutations = {
  [LOAD_CHANNELS] (state, channels) {
    state.all = channels;
  },

  [SET_CURRENT_CHANNEL] (state, channel) {
    state.current = channel;
  }
};

export default {
  state,
  mutations
}