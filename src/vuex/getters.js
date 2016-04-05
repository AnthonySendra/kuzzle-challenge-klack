export const getChannels = state => {
  return state.channels.all;
};

export const getMessages = state => {
  return state.messages.all;
};

export const getCurrentChannel = state => {
  return state.channels.current
};

export const getSearchTerms = state => {
  return state.messages.searchTerms;
};

export const getSearchedMessages = state => {
  return state.messages.search;
};