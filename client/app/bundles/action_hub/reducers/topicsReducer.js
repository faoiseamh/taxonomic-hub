/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/topicsConstants';

export const $$initialState = Immutable.fromJS({
  $$topics: [],
  fetchTopicError: null,
  fetchTopicsError: null,
  submitTopicError: null,
  isFetchingTopic: false,
  isFetchingTopics: false,
  isSavingTopics: false,
});

export default function topicsReducer($$state = $$initialState, action = null) {
  const { type, topic, topics, error } = action;

  switch (type) {
    case actionTypes.FETCH_TOPIC_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$topics'],
            $$topics => $$topics.unshift(Immutable.fromJS(topic)),
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

    case actionTypes.SUBMIT_TOPIC_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$topics'],
            $$topics => $$topics.unshift(Immutable.fromJS(topic)),
          )
          .merge({
            submitTopicError: null,
            isSavingTopics: false,
          })
      ));
    }

    case actionTypes.SUBMIT_TOPIC_FAILURE: {
      return $$state.merge({
        submitTopicError: error,
        isSavingTopics: false,
      });
    }

    case actionTypes.SET_IS_FETCHING_CATEGORIES: {
      return $$state.merge({
        isFetchingTopics: true,
      });
    }

    case actionTypes.SET_IS_SAVING_CATEGORY: {
      return $$state.merge({
        isSavingTopics: true,
      });
    }

    default: {
      return $$state;
    }
  }
}
