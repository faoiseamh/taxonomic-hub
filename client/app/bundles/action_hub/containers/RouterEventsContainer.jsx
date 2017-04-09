import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import * as query from '../reducers/queries';

import EventsScreen from '../components/EventsScreen/EventsScreen';
import * as eventsActionCreators from '../actions/eventsActionCreators';
import * as eventFavoritesActionCreators from '../actions/eventFavoritesActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    data: state.$$eventsState,
    $$events: query.getEvents(state),
    $$topics: query.getTopics(state),
    getEventTopicRelationshipsForEvent: (eventId) =>
      query.getEventTopicRelationshipsForEvent(state, eventId),
    getTopicsForEvent: (eventId) => query.getTopicsForEvent(state, eventId),
    getEventFavoritesForEvent: (eventId) => query.getEventFavoritesForEvent(state, eventId),
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
    getEventFavoritesForEvent: PropTypes.func.isRequired,
  };

  render() {
    const {
      $$events,
      $$topics,
      data,
      dispatch,
      getEventFavoritesForEvent
      getTopicsForEvent,
    } = this.props;
    const actions = bindActionCreators(eventsActionCreators, dispatch);
    const eventFavoriteActions = bindActionCreators(eventFavoritesActionCreators, dispatch);
    const locationState = this.props.location.state;

    return (
      <EventsScreen
        {
          ...{
            $$events,
            $$topics,
            actions,
            data,
            eventFavoriteActions,
            getEventFavoritesForEvent
            getTopicsForEvent,
            locationState,
          }
        }
      />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterEventsContainer);
