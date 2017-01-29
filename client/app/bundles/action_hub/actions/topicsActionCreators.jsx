import requestsManager from 'libs/requestsManager'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/topicsConstants';

export function setIsFetchingTopic() {
  return {
    type: actionTypes.SET_IS_FETCHING_TOPIC,
  };
}

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

export function fetchTopicSuccess(topic) {
  return {
    type: actionTypes.FETCH_TOPIC_SUCCESS,
    topic,
  };
}

export function fetchTopicFailure(error) {
  return {
    type: actionTypes.FETCH_TOPIC_FAILURE,
    error,
  };
}

export function fetchTopicsSuccess(data) {
  return {
    type: actionTypes.FETCH_TOPICS_SUCCESS,
    topics: data.topics,
  };
}

export function fetchTopicsFailure(error) {
  return {
    type: actionTypes.FETCH_TOPICS_FAILURE,
    error,
  };
}

export function submitTopicSuccess(topic) {
  return {
    type: actionTypes.SUBMIT_TOPICS_SUCCESS,
    topic,
  };
}

export function submitTopicFailure(error) {
  return {
    type: actionTypes.SUBMIT_TOPICS_FAILURE,
    error,
  };
}

export function fetchTopic(topicId) {
  return (dispatch) => {
    dispatch(setIsFetchingTopic());
    return (
      requestsManager.fetchTopic(topicId)
        .done(res => dispatch(fetchTopicSuccess(res)))
        .fail(error => dispatch(fetchTopicFailure(error)))
    );
  };
}

export function fetchTopics() {
  return (dispatch) => {
    dispatch(setIsFetchingTopics());
    return (
      requestsManager.fetchTopics()
        .done(res => dispatch(fetchTopicsSuccess(res)))
        .fail(error => dispatch(fetchTopicsFailure(error)))
    );
  };
}

export function submitTopic(topic) {
  return (dispatch) => {
    dispatch(setIsSavingTopic());
    return (
      requestsManager.createTopic(topic)
        .done(res => dispatch(submitTopicSuccess(res)))
        .fail(error => dispatch(submitTopicFailure(error)))
    );
  };
}
