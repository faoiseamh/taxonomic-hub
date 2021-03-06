import dateFormat from 'dateformat';
import React from 'react';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as formatConstants from '../../constants/formatConstants';

import EventFavoriteButton from '../Event/EventFavoriteButton';
import EventFormDialog from '../Event/EventFormDialog';

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
      creationFormOpen: false,
    };

    _.bindAll(this, [
      'handleCloseCreationForm',
      'renderCreationDialog',
      'showCreationForm',
    ]);
  }

  handleCloseCreationForm() {
    this.setState({ creationFormOpen: false });
  }


  goToEvent($$event) {
    const { goToEvent } = this.props.actions;
    goToEvent($$event.get('id'));
  }

  showCreationForm() {
    this.setState({ creationFormOpen: true });
  }

  render() {
    const { eventFavoriteActions, getEventFavoritesForEvent, $$events } = this.props;

    let favorite;

    const eventNodes = $$events.map(($$event) => {

      return (
        <Card
          key={$$event.get('id')}
          onClick={() => { this.goToEvent($$event); }}
          style={styles.eventCard}
        >
          <CardTitle
            title={$$event.get('title')}
            subtitle={dateFormat(Date.parse($$event.get('date')), formatConstants.verbose)}
          />
          <CardActions style={{ textAlign: 'right' }}>
            <EventFavoriteButton
              {...{ eventFavoriteActions, getEventFavoritesForEvent, $$event }}
            />
          </CardActions>
        </Card>
      )
    });

    return (
      <div>
        {eventNodes}

        <FloatingActionButton
          className="floating-actions-menu"
          onClick={this.showCreationForm}
        >
          <ContentAdd />
        </FloatingActionButton>

        {this.renderCreationDialog()}

      </div>
    );
  }

  renderCreationDialog() {
    const { data, actions, $$topics } = this.props;
    return (
      <EventFormDialog
        data={data}
        $$topics={$$topics}
        actions={actions}
        open={this.state.creationFormOpen}
        handleRequestClose={this.handleCloseCreationForm}
      />
    );
  }
}
