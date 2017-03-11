import { push } from 'react-router-redux';
import requestsManager from 'libs/requestsManager'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/eventsConstants';
import * as paths from '../constants/paths';

// TODO: Is this the right place for this?
export function goToEvent(eventId) {
  return (dispatch) => dispatch(push(paths.eventPath(eventId)));
}
