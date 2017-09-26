import dateFormat from 'dateformat';
import React, { PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { blueGrey800 } from 'material-ui/styles/colors';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import FullPageTearSheet from '../Misc/FullPageTearSheet';
import Paper from 'material-ui/Paper';
import TopicTag from '../Topic/TopicTag';
import * as formatConstants from '../../constants/formatConstants';


import EventFavoriteButton from './EventFavoriteButton';

export default class EventHeader extends BaseComponent {

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
    const {
      $$event,
      usersState,
      topics,
      eventFavoriteActions,
      getCategoriesForTopic,
      getEventFavoritesForEvent,
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

    const mode = data.$$pageState.get('mode');

    let favorite;

    if (usersState.get('isAuthenticated')) {
      favorite = (
        <EventFavoriteButton
          {...{ eventFavoriteActions, getEventFavoritesForEvent, $$event }}
          color={blueGrey800}
        />
      );
    }

    const titleOverlay = (
      <div className="header-overlay">
        <h1>
          {
            if (mode == 'view') {
              return $$event.get('title');
            } else {
              return (
                <TextField
                  hintText="Event Title"
                  value={$$event.get('title')}
                />
              );
            }
          }
        </h1>
        <div className="tags-container">
          {topicTagNodes}
        </div>
      </div>
    );

    return (
      <Card className="event-header">
        <CardMedia
          overlay={titleOverlay}
        >
          <img src="https://www.google.com/permissions/images/maps-att.png" />
        </CardMedia>

        <Paper className="event-action-bar" zDepth={1}>
          <div className="action-buttons">
            {favorite}
          </div>
          <div className="date">
            {dateFormat(Date.parse($$event.get('date')), formatConstants.verbose)}
          </div>
          <div className="location">
            {$$event.get('location_name')}
          </div>
        </Paper>


        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );

  }
}


