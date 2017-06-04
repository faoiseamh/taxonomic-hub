import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import EventHeader from './EventHeader';
import EventBody from './EventBody';

export default class Event extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    pageActions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    usersState: PropTypes.object.isRequired,
    $$event: PropTypes.object.isRequired,
    topics: PropTypes.array.isRequired,
    getCategoriesForTopic: PropTypes.func.isRequired,
    eventFavoriteActions: PropTypes.object.isRequired,
    getEventFavoritesForEvent: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { pageActions } = this.props;
    pageActions.setPageIsEditable();
  }

  componentWillUnmount() {
    const { pageActions } = this.props;
    pageActions.setPageNotEditable();
  }

  render() {
    const {
      data,
      usersState,
      actions,
      $$event,
      topics,
      getCategoriesForTopic,
      eventFavoriteActions,
      getEventFavoritesForEvent,
    } = this.props;

    return (
      <div>
        <EventHeader
          {...{
            data,
            usersState,
            actions,
            $$event,
            topics,
            getCategoriesForTopic,
            eventFavoriteActions,
            getEventFavoritesForEvent,
          }}
        />
        <EventBody
          {...{
            data,
            actions,
            $$event,
          }}
        />
      </div>
    );
  }
}
