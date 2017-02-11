import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import Topic from '../Topic/Topic';
import PageLoadingIndicator from '../Loaders/PageLoadingIndicator';

// import css from './TopicScreen.scss';

export default class TopicScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    topicId: PropTypes.string.isRequired,
    $$categories: PropTypes.object,
    $$topic: PropTypes.object,
    locationState: PropTypes.object,
  };

  componentWillMount() {
    const { topicId } = this.props;
    const { fetchTopic } = this.props.actions;
    fetchTopic(topicId);
  }

  render() {
    const { data, actions, $$topic, $$categories } = this.props;

    // Show loading screen if load is in progress
    if (data.get('isFetchingTopic')) {
      return this.constructor.loading();
    }

    // Try to fetch it
    if (!$$topic) {
      // It might not exist yet because request is still going
      return this.constructor.loading();
    }

    return (
      <div>
        <div>
          <Topic {...{ actions, data, $$topic, $$categories }} />
        </div>
      </div>
    );
  }

  static loading() {
    return (<PageLoadingIndicator />);
  }
}
