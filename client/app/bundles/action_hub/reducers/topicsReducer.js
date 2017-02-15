/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/topicsConstants';

export function getTopic(state, topicId) {
  return state.get('$$topics').get(String(topicId));
}

export const $$initialState = Immutable.fromJS({
  $$topics: {},
  fetchTopicError: null,
  fetchTopicsError: null,
  saveTopicError: null,
  isFetchingTopic: false,
  isFetchingTopics: false,
  isSavingTopic: false,
});

export default function topicsReducer($$state = $$initialState, action = null) {
  const { type, topic, topics, error } = action;

  switch (type) {
    case actionTypes.FETCH_TOPIC_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$topics'],
            $$topics => Immutable.fromJS({
              ...$$topics.toJS(),
              [topic.id]: topic,
            }),
          )
          .merge({
            fetchTopicError: null,
            isFetchingTopic: false,
          })
      ));
    }

    case actionTypes.FETCH_TOPIC_FAILURE: {
      return $$state.merge({
        fetchTopicError: error,
        isFetchingTopic: false,
      });
    }

    case actionTypes.FETCH_TOPICS_SUCCESS: {
      return $$state.merge({
        $$topics: topics,
        fetchTopicsError: null,
        isFetchingTopics: false,
      });
    }

    case actionTypes.FETCH_TOPICS_FAILURE: {
      return $$state.merge({
        fetchTopicsError: error,
        isFetchingTopics: false,
      });
    }

    case actionTypes.SAVE_TOPIC_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$topics'],
            $$topics => Immutable.fromJS({
              ...$$topics.toJS(),
              [topic.id]: topic,
            }),
          )
          .merge({
            saveTopicError: null,
            isSavingTopic: false,
          })
      ));
    }

    case actionTypes.SAVE_TOPIC_FAILURE: {
      return $$state.merge({
        saveTopicError: error,
        isSavingTopic: false,
      });
    }

    case actionTypes.CLEAR_SAVE_TOPIC_FAILURE: {
      return $$state.merge({
        saveTopicError: null,
      });
    }

    case actionTypes.SET_IS_FETCHING_TOPIC: {
      return $$state.merge({
        isFetchingTopic: true,
      });
    }

    case actionTypes.SET_IS_FETCHING_TOPICS: {
      return $$state.merge({
        isFetchingTopics: true,
      });
    }

    case actionTypes.SET_IS_SAVING_TOPIC: {
      return $$state.merge({
        isSavingTopic: true,
      });
    }

    default: {
      return $$state;
    }
  }
}
