import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import * as query from '../reducers/queries';

import EventsScreen from '../components/EventsScreen/EventsScreen';
import * as eventsActionCreators from '../actions/eventsActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    data: state.$$eventsState,
    $$events: query.getEvents(state),
    getTopicsForEvent: (categoryId) => query.getTopicsForEvent(state, categoryId),
  };
}

class RouterEventsContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
    $$events: PropTypes.object.isRequired,
    getTopicsForEvent: PropTypes.func.isRequired,
  };

  render() {
    const { dispatch, data, $$events, getTopicsForEvent } = this.props;
    const actions = bindActionCreators(eventsActionCreators, dispatch);
    const locationState = this.props.location.state;

    return (
      <EventsScreen {...{ actions, data, locationState, $$events, getTopicsForEvent }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterEventsContainer);
