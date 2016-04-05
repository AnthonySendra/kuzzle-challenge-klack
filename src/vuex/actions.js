import * as types from './mutation-types';
import kuzzle from '../services/kuzzle';


export const loadMessages = ({ dispatch }, channel) => {
  var query = {
    sort: {date: 'desc'},
    from: 0,
    size: 30,
    filter: {
      term: {
        channel: channel
      }
    }
  };

  kuzzle
    .dataCollectionFactory('messages')
    .advancedSearch(query, (error, result) => {
      if (error) {
        console.error(error);
        return false;
      }

      dispatch(types.LOAD_MESSAGES, result.documents
        .map(message => {
          return {
            ...message.content,
            id: message.id
          };
        })
        .reverse());
    });
};

export const resetMessages = ({ dispatch }) => {
  dispatch(types.RESET_MESSAGES);
};

export const searchMessages = ({ dispatch }, currentChannel, searchTerms) => {
  var query = {
    sort: {date: 'desc'},
    query : {
      match: {
        content: {
          query: searchTerms,
          operator : 'and'
        }
      }
    },
    filter: {
      term: {
        currentChannel
      }
    }
  };

  kuzzle
    .dataCollectionFactory('messages')
    .advancedSearch(query, (error, result) => {
      if (error) {
        console.error(error);
        return false;
      }

      dispatch(types.SEARCH_MESSAGES, result.documents
        .map(message => {
          return {
            ...message.content,
            id: message.id
          };
        }));
    });
};

export const addMessage = ({ dispatch }, content, user, channel) => {
  var message = {message, user, channel, date: Date.now()};

  kuzzle
    .dataCollectionFactory('messages')
    .createDocument(message);
};

export const resetSearchMessages = ({ dispatch }) => {
  dispatch(types.RESET_SEARCH_MESSAGES);
};

export const updateSearchTerms = ({ dispatch }, e) => {
  dispatch(types.UPDATE_SEARCH_TERMS, e.target.value);
};

export const loadChannels = ({ dispatch }) => {
  var query = {
    sort: ['name'],
    from: 0,
    size: 9999
  };

  kuzzle
    .dataCollectionFactory('channels')
    .advancedSearch(query, (error, result) => {
      if (error) {
        console.error(error);
        return false;
      }

      dispatch(types.LOAD_CHANNELS, result.documents.map(channel => channel.content.name));
    });
};

export const setCurrentChannel = ({ dispatch }, channel) => {
  dispatch(types.SET_CURRENT_CHANNEL, channel);
};