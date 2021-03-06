import requestsManager from 'libs/requestsManager'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/eventFavoritesConstants';

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

// Create
export function createEventFavoriteSuccess(eventFavorite) {
  return {
    type: actionTypes.CREATE_EVENT_FAVORITE_SUCCESS,
    eventFavorite,
  };
}

export function createEventFavoriteFailure(error) {
  return {
    type: actionTypes.CREATE_EVENT_FAVORITE_FAILURE,
    error,
  };
}

export function createEventFavorite(eventFavorite) {
  return (dispatch) => {
    dispatch(setIsSavingEventFavorites());
    return (
      requestsManager.createEventFavorite(eventFavorite)
        .done(res => dispatch(createEventFavoriteSuccess(res)))
        .fail(error => dispatch(createEventFavoriteFailure(error)))
    );
  };
}

// Delete
export function setIsDeletingEventFavorite() {
  return {
    type: actionTypes.SET_IS_DELETING_EVENT_FAVORITE,
  };
}

export function deleteEventFavoriteSuccess(eventFavorite) {
  return {
    type: actionTypes.DELETE_EVENT_FAVORITE_SUCCESS,
    eventFavorite,
  };
}
export function deleteEventFavoriteFailure(error) {
  return {
    type: actionTypes.DELETE_EVENT_FAVORITE_FAILURE,
    error,
  };
}

export function clearDeleteEventFavoriteFailure() {
  return {
    type: actionTypes.CLEAR_DELETE_EVENT_FAVORITE_FAILURE,
  };
}

export function deleteEventFavorite(eventFavorite) {
  return (dispatch) => {
    dispatch(setIsDeletingEventFavorite());
    return (
      requestsManager.deleteEventFavorite(eventFavorite)
        .done((deletedEventFavorite) => dispatch(deleteEventFavoriteSuccess(deletedEventFavorite)))
        .fail(error => dispatch(deleteEventFavoriteFailure(error)))
    );
  };
}
