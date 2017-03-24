import dateFormat from 'dateformat';
import React from 'react';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as formatConstants from '../../constants/formatConstants';

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
    const { data, actions } = this.props;
    return (
      <EventFormDialog
        data={data}
        actions={actions}
        open={this.state.creationFormOpen}
        handleRequestClose={this.handleCloseCreationForm}
      />
    );
  }
}
