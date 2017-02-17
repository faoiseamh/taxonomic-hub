import { push } from 'react-router-redux';
import requestsManager from 'libs/requestsManager'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/topicsConstants';
import * as categoryTopicRelationshipActionTypes from '../constants/categoryTopicRelationshipsConstants';
import * as paths from '../constants/paths';

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

export function hideTopicSavedNotice() {
  return (dispatch) => dispatch({
    type: actionTypes.HIDE_TOPIC_SAVED_NOTICE,
  });
}

export function saveTopicSuccess(topic, categoryTopicRelationships) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_TOPIC_SUCCESS,
      topic,
    });
    dispatch({
      type: categoryTopicRelationshipActionTypes.UPDATE_CATEGORY_TOPIC_RELATIONSHIPS_FOR_TOPIC,
      topic,
      categoryTopicRelationships,
    });
  };
}

export function saveTopicFailure(error) {
  return {
    type: actionTypes.SAVE_TOPIC_FAILURE,
    error,
  };
}

export function clearSaveTopicFailure() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_SAVE_TOPIC_FAILURE,
    });
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

export function createTopic(topic) {
  return (dispatch) => {
    dispatch(setIsSavingTopic());
    return (
      requestsManager.createTopic(topic)
        .done(res => {
          dispatch(saveTopicSuccess(res.topic, res.category_topic_relationships));
          dispatch(push(paths.topicPath(res.topic.id)));
        })
        .fail(error => dispatch(saveTopicFailure(error)))
    );
  };
}


export function updateTopic(topic) {
  return (dispatch) => {
    dispatch(setIsSavingTopic());
    return (
      requestsManager.updateTopic(topic)
        .done(res => dispatch(saveTopicSuccess(res.topic, res.category_topic_relationships)))
        .fail(error => dispatch(saveTopicFailure(error)))
    );
  };
}

export function deleteTopicSuccess(topic) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_TOPIC_SUCCESS,
      topic,
    });
    dispatch({
      type: categoryTopicRelationshipActionTypes.DELETE_CATEGORY_TOPIC_RELATIONSHIPS_FOR_TOPIC,
      topic,
    });
    dispatch(push(paths.ROOT_PATH));
  };
}

export function deleteTopicFailure(error) {
  return {
    type: actionTypes.DELETE_TOPIC_FAILURE,
    error,
  };
}

export function clearDeleteTopicFailure() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_DELETE_TOPIC_FAILURE,
    });
  };
}

export function setIsDeletingTopic() {
  return {
    type: actionTypes.SET_IS_DELETING_TOPIC,
  };
}

export function deleteTopic(topic) {
  return (dispatch) => {
    dispatch(setIsDeletingTopic());
    return (
      requestsManager.deleteTopic(topic)
        .done(() => dispatch(deleteTopicSuccess(topic)))
        .fail(error => dispatch(deleteTopicFailure(error)))
    );
  };
}

