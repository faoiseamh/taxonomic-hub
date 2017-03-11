import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import EventHeader from './EventHeader';

export default class EventScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    $$event: PropTypes.object.isRequired,
    topics: PropTypes.array.isRequired,
    getCategoriesForTopic: PropTypes.func.isRequired,
  };

  render() {
    const { data, actions, $$event, topics, getCategoriesForTopic } = this.props;

    return (
      <div>
        <EventHeader
          {...{ data, actions, $$event, topics, getCategoriesForTopic }}
        />
      </div>
    );
  }
}
