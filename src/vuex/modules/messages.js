import {
  LOAD_MESSAGES,
  RESET_MESSAGES,
  SEARCH_MESSAGES,
  RESET_SEARCH_MESSAGES,
  UPDATE_SEARCH_TERMS
} from '../mutation-types';

const state = {
  all: [],
  search: [],
  searchTerms: null
};

const mutations = {
  [LOAD_MESSAGES] (state, messages) {
    state.all = messages;
  },

  [RESET_MESSAGES] (state) {
    state.all = [];
  },

  [SEARCH_MESSAGES] (state, messages) {
    state.search = messages;
  },

  [RESET_SEARCH_MESSAGES] (state) {
    state.search = [];
  },

  [UPDATE_SEARCH_TERMS] (state, searchTerms) {
    state.searchTerms = searchTerms;
  }
};

export default {
  state,
  mutations
}