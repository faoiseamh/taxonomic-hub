import { push } from 'react-router-redux';
import requestsManager from 'libs/requestsManager'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/eventFavoritesConstants';
import * as paths from '../constants/paths';

export function setIsFetchingEventFavorite() {
  return {
    type: actionTypes.SET_IS_FETCHING_EVENT_FAVORITE,
  };
}

export function setIsFetchingEventFavorites() {
  return {
    type: actionTypes.SET_IS_FETCHING_EVENT_FAVORITES,
  };
}

export function setIsSavingEventFavorites() {
  return {
    type: actionTypes.SET_IS_SAVING_EVENT_FAVORITES,
  };
}

export function fetchEventFavoriteSuccess(topic) {
  return {
    type: actionTypes.FETCH_EVENT_FAVORITE_SUCCESS,
    topic,
  };
}

export function fetchEventFavoriteFailure(error) {
  return {
    type: actionTypes.FETCH_EVENT_FAVORITES_FAILURE,
    error,
  };
}

export function fetchEventFavoriteSuccess(data) {
  return {
    type: actionTypes.FETCH_EVENT_FAVORITE_SUCCESS,
    topics: data.topics,
  };
}

export function fetchEventFavoritesFailure(error) {
  return {
    type: actionTypes.FETCH_EVENT_FAVORITES_FAILURE,
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

export function fetchEventFavorite(eventId) {
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
