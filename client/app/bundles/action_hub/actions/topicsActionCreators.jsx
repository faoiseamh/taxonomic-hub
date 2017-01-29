import * as actionTypes from '../constants/topicsConstants';

export function setIsFetchingTopics() {
  return {
    type: actionTypes.SET_IS_FETCHING_TOPICS,
  };
}

export function setIsSavingTopic() {
  return {
    type: actionTypes.SET_IS_SAVING_TOPIC,
  };
}

export function fetchTopicsSuccess(data) {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    topics: data.topics,
  };
}

export function fetchTopicsFailure(error) {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILURE,
    error,
  };
}

export function submitTopicSuccess(topic) {
  return {
    type: actionTypes.SUBMIT_CATEGORY_SUCCESS,
    topic,
  };
}

export function submitTopicFailure(error) {
  return {
    type: actionTypes.SUBMIT_CATEGORY_FAILURE,
    error,
  };
}

export function fetchTopics() {
  return (dispatch) => {
    dispatch(setIsFetchingTopics());
    return (
      $.get('/topics')
        .done(res => dispatch(fetchTopicsSuccess(res)))
        .fail(error => dispatch(fetchTopicsFailure(error)))
    );
  };
}

export function submitTopic(topic) {
  return (dispatch) => {
    dispatch(setIsSavingTopic());
    return (
      $.post('/topics', { topic: topic })
        .done(res => dispatch(submitTopicSuccess(res)))
        .fail(error => dispatch(submitTopicFailure(error)))
    );
  };
}
