import dateFormat from 'dateformat';
import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import FlatButton from 'material-ui/FlatButton';
import FullPageTearSheet from '../Misc/FullPageTearSheet';
import TopicTag from '../Topic/TopicTag';
import * as formatConstants from '../../constants/formatConstants';

import EventFavoriteButton from './EventFavoriteButton';
import ShareButton from '../Sharing/ShareButton';

export default class EventScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    usersState: PropTypes.object.isRequired,
    $$event: PropTypes.object.isRequired,
    topics: PropTypes.array.isRequired,
    getCategoriesForTopic: PropTypes.func.isRequired,
    eventFavoriteActions: PropTypes.object.isRequired,
  };

  render() {
    const { $$event,
      usersState,
      topics,
      eventFavoriteActions,
      getCategoriesForTopic,
      getEventFavoritesForEvent
    } = this.props;
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

    if (usersState.get('isAuthenticated')) {
      favorite = <EventFavoriteButton
        {...{ eventFavoriteActions, getEventFavoritesForEvent, $$event }}
      />;
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
          <div>
            <ShareButton />
          </div>
        </div>
      </FullPageTearSheet>
    );
  }
}
