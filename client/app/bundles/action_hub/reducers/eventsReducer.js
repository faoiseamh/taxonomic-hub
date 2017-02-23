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
});

export default function eventsReducer($$state = $$initialState, action = null) {
  const { type, event, events, error } = action;

  switch (type) {

    default: {
      return $$state;
    }
  }
}
