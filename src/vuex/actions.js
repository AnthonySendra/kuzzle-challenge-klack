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