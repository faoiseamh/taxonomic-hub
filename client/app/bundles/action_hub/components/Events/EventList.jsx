import dateFormat from 'dateformat';
import React from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Link } from 'react-router';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as formatConstants from '../../constants/formatConstants';
import * as paths from '../../constants/paths';

const styles = {
  eventCard: {
    margin: 10,
  },
};

export default class EventList extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    const { $$events } = this.props;

    const eventNodes = $$events.map(($$event) =>
      <Card
        key={$$event.get('id')}
        style={styles.eventCard}
      >
        <CardTitle
          title={$$event.get('title')}
          subtitle={dateFormat(Date.parse($$event.get('date')), formatConstants.verbose)}
        />
        <CardText>
          {$$event.get('body')}
        </CardText>
      </Card>,
    );

    return (
      <div>
        {eventNodes}
        <FloatingActionButton
          containerElement={
            <Link to={`${paths.EVENT_CREATE_PATH}`} /> // eslint-disable-line jsx-a11y/anchor-has-content
          }
          className="floating-actions-menu"
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}
