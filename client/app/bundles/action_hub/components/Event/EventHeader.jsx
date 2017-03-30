import dateFormat from 'dateformat';
import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import FlatButton from 'material-ui/FlatButton';
import FullPageTearSheet from '../Misc/FullPageTearSheet';
import TopicTag from '../Topic/TopicTag';
import * as formatConstants from '../../constants/formatConstants';

export default class EventScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    $$event: PropTypes.object.isRequired,
    topics: PropTypes.array.isRequired,
    getCategoriesForTopic: PropTypes.func.isRequired,
    eventFavoriteActions: PropTypes.object.isRequired,
  };

  addFavorite($$event) {
    const { eventFavoriteActions } = this.props;

    eventFavoriteActions.createEventFavorite({
      event_id: $$event.get('id'),
    });
  }

  deleteFavorite($$event) {
    const { eventFavoriteActions } = this.props;

    eventFavoriteActions.deleteEventFavorite({
      event_id: $$event.get('id'),
    });
  }

  render() {
    const { $$event, topics, getCategoriesForTopic, getEventFavoritesForEvent } = this.props;
    const topicTagNodes = topics.map(($$topic) => {
      const categories = getCategoriesForTopic($$topic.get('id'));
      return (
        <TopicTag
          key={$$topic.get('id')}
          $$topic={$$topic}
          categories={categories}
        />
      );
    });

    let favorite;

    if (getEventFavoritesForEvent($$event.get('id')).length > 0) {
      favorite = <FlatButton label="-Favorite" onClick={() => this.deleteFavorite($$event)} />;
    } else {
      favorite = <FlatButton label="+Favorite" onClick={() => this.addFavorite($$event)} />;
    }

    return (
      <FullPageTearSheet>
        <div className="event-header">
          <h1>
            {$$event.get('title')}
          </h1>
          <div className="date">
            {dateFormat(Date.parse($$event.get('date')), formatConstants.verbose)}
          </div>
          <div className="tags-container">
            {topicTagNodes}
          </div>
          <div>
            {favorite}
          </div>
        </div>
      </FullPageTearSheet>
    );
  }
}
