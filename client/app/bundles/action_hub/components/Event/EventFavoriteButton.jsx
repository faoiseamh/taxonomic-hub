import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { red500 } from 'material-ui/styles/colors';

export default class EventFavoriteButton extends BaseComponent {

  static propTypes = {
    $$event: PropTypes.object.isRequired,
    eventFavoriteActions: PropTypes.object.isRequired,
    getEventFavoritesForEvent: PropTypes.func.isRequired,
    color: PropTypes.string,
  };

  addFavorite() {
    const { eventFavoriteActions, $$event } = this.props;

    eventFavoriteActions.createEventFavorite({
      event_id: $$event.get('id'),
    });
  }

  deleteFavorite() {
    const { eventFavoriteActions, $$event } = this.props;

    eventFavoriteActions.deleteEventFavorite({
      event_id: $$event.get('id'),
    });
  }


  render() {
    const { getEventFavoritesForEvent, $$event, color } = this.props;

    if (getEventFavoritesForEvent($$event.get('id')).length > 0) {
      return (
        <IconButton
          onClick={(e) => { e.stopPropagation(); this.deleteFavorite() } }
        >
          <FontIcon className="material-icons" color={color}>favorite</FontIcon>
        </IconButton>
      );
    } else {
      return (
        <IconButton
          label="-Favorite"
          onClick={(e) => { e.stopPropagation(); this.addFavorite() } }
        >
          <FontIcon className="material-icons" color={color}>favorite_border</FontIcon>
        </IconButton>
      )
    }

  }
}

EventFavoriteButton.defaultProps = {
  color: red500
}
