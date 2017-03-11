import dateFormat from 'dateformat';
import React from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import * as formatConstants from '../../constants/formatConstants';

const styles = {
  eventCard: {
    margin: 10,
    cursor: 'pointer',
  },
};

export default class EventList extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  goToEvent($$event) {
    const { goToEvent } = this.props.actions;
    console.log("going there");
    goToEvent($$event.get('id'));
  }

  render() {
    const { $$events } = this.props;

    const eventNodes = $$events.map(($$event) =>
      <Card
        key={$$event.get('id')}
        onClick={() => { this.goToEvent($$event); }}
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
      </div>
    );
  }
}
