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
