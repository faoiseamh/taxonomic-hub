import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import EventList from '../Events/EventList';
import EventSearch from '../Events/EventSearch';

export default class EventsScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    eventFavoriteActions: PropTypes.object.isRequired,
    $$events: PropTypes.object.isRequired,
    $$topics: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    getTopicsForEvent: PropTypes.func.isRequired,
    getEventFavoritesForEvent: PropTypes.func.isRequired,
    locationState: PropTypes.object,
  };

  render() {
    const { data, actions, eventFavoriteActions, $$events, $$topics, getTopicsForEvent, getEventFavoritesForEvent } = this.props;

    return (
      <div>
        <EventSearch />
        <EventList
          {...{ actions, eventFavoriteActions, data, getTopicsForEvent, getEventFavoritesForEvent, $$events, $$topics }}
        />
      </div>
    );
  }
}
