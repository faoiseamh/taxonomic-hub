import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import Event from '../Event/Event';

export default class EventScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    usersState: PropTypes.object.isRequired,
    $$event: PropTypes.object.isRequired,
    topics: PropTypes.array.isRequired,
    getCategoriesForTopic: PropTypes.func.isRequired,
    locationState: PropTypes.object,
    eventFavoriteActions: PropTypes.object.isRequired,
    getEventFavoritesForEvent: PropTypes.func.isRequired,
  };

  render() {
    const { data, usersState, actions, $$event, topics, getCategoriesForTopic, eventFavoriteActions, getEventFavoritesForEvent } = this.props;

    return (
      <Event
        {...{ data, usersState, actions, $$event, topics, getCategoriesForTopic, eventFavoriteActions, getEventFavoritesForEvent }}
      />
    );
  }
}
