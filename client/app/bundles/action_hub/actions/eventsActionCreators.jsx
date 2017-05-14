import { push } from 'react-router-redux';
import requestsManager from 'libs/requestsManager'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/eventsConstants';
import * as eventTopicRelationshipActionTypes from '../constants/eventTopicRelationshipsConstants';
import * as paths from '../constants/paths';

// TODO: Is this the right place for this?
export function goToEvent(eventId) {
  return (dispatch) => dispatch(push(paths.eventPath(eventId)));
}

export function setIsSavingEvent() {
  return {
    type: actionTypes.SET_IS_SAVING_EVENT,
  };
}

export function saveEventSuccess(event, eventTopicRelationships) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_EVENT_SUCCESS,
      event,
    });
    dispatch({
      type: eventTopicRelationshipActionTypes.UPDATE_EVENT_TOPIC_RELATIONSHIPS_FOR_EVENT,
      event,
      eventTopicRelationships,
    });
  };
}

export function saveEventFailure(error) {
  return {
    type: actionTypes.SAVE_EVENT_FAILURE,
    error,
  };
}

export function clearSaveEventFailure() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_SAVE_EVENT_FAILURE,
    });
  };
}

export function createEvent(event) {
  return (dispatch) => {
    dispatch(setIsSavingEvent());
    return (
      requestsManager.createEvent(event)
        .done(res => {
          dispatch(saveEventSuccess(res.event, res.event_topic_relationships));
          dispatch(push(paths.eventPath(res.event.id)));
        })
        .fail(error => dispatch(saveEventFailure(error)))
    );
  };
}
