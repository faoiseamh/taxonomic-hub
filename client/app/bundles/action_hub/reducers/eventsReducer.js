/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/eventsConstants';


export function getEvents($$state) {
  return $$state.get('$$events').valueSeq();
}

export function getEvent($$state, eventId) {
  return $$state.get('$$events').get(String(eventId));
}

export const $$initialState = Immutable.fromJS({
  $$events: {},
  saveEventError: null,
  isEventSavedNoticeVisible: false,
  isSavingEvent: false,
});

export default function eventsReducer($$state = $$initialState, action = null) {
  const { type, event, events, error } = action;

  switch (type) {

    case actionTypes.FETCH_EVENT_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$events'],
            $$events => Immutable.fromJS({
              ...$$events.toJS(),
              [event.id]: event,
            }),
          )
          .merge({
            fetchEventError: null,
            isFetchingEvent: false,
          })
      ));
    }

    case actionTypes.FETCH_EVENT_FAILURE: {
      return $$state.merge({
        fetchEventError: error,
        isFetchingEvent: false,
      });
    }

    case actionTypes.FETCH_EVENTS_SUCCESS: {
      return $$state.merge({
        $$events: events,
        fetchEventsError: null,
        isFetchingEvents: false,
      });
    }

    case actionTypes.FETCH_EVENTS_FAILURE: {
      return $$state.merge({
        fetchEventsError: error,
        isFetchingEvents: false,
      });
    }

    case actionTypes.SAVE_EVENT_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$events'],
            $$events => Immutable.fromJS({
              ...$$events.toJS(),
              [event.id]: event,
            }),
          )
          .merge({
            saveEventError: null,
            isSavingEvent: false,
            isEventSavedNoticeVisible: true,
          })
      ));
    }

    case actionTypes.SAVE_EVENT_FAILURE: {
      return $$state.merge({
        saveEventError: error,
        isSavingEvent: false,
        isSavedNoticeVisible: false,
      });
    }

    case actionTypes.CLEAR_SAVE_EVENT_FAILURE: {
      return $$state.merge({
        saveEventError: null,
      });
    }

    case actionTypes.SET_IS_FETCHING_EVENT: {
      return $$state.merge({
        isFetchingEvent: true,
      });
    }

    case actionTypes.SET_IS_FETCHING_EVENTS: {
      return $$state.merge({
        isFetchingEvents: true,
      });
    }

    case actionTypes.SET_IS_SAVING_EVENT: {
      return $$state.merge({
        isSavingEvent: true,
      });
    }

    case actionTypes.HIDE_EVENT_SAVED_NOTICE: {
      return $$state.merge({
        isEventSavedNoticeVisible: false,
      });
    }

    // Delete
    case actionTypes.SET_IS_DELETING_EVENT: {
      return $$state.merge({
        isDeletingEvent: true,
      });
    }

    case actionTypes.DELETE_EVENT_FAILURE: {
      return $$state.merge({
        deleteEventError: error,
        isDeletingEvent: false,
      });
    }

    case actionTypes.CLEAR_DELETE_EVENT_FAILURE: {
      return $$state.merge({
        deleteEventError: null,
      });
    }

    case actionTypes.DELETE_EVENT_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$events'],
            $$events => $$events.filter(($$event) => $$event.get('id') !== event.id),
          )
          .merge({
            deleteEventError: null,
            isDeletingEvent: false,
          })
      ));
    }

    default: {
      return $$state;
    }
  }
}
