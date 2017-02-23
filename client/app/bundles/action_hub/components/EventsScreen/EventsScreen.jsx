import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
// import Events from '../Events/Events';

export default class EventsScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    $$events: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    getTopicsForEvents: PropTypes.func.isRequired,
    locationState: PropTypes.object,
  };

  render() {
    const { data, actions, $$events, getTopicsForEvents } = this.props;

    return (
      <div>
        events
      </div>
    );
  }
}
