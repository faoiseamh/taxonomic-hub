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
    locationState: PropTypes.object,
  };

  componentWillMount() {
    const { topicId } = this.props;
    const { fetchTopic } = this.props.actions;
    fetchTopic(topicId);
  }

  render() {
    const { data, actions, topicId } = this.props;

    // Show loading screen if load is in progress
    if (data.$$topicsState.get('isFetchingTopic')) {
      return this.constructor.loading();
    }

    // Try to fetch it
    const topic = data.$$topicsState.get('$$topics').get(topicId);
    if (!topic) {
      // It might not exist yet because request is still going
      return this.constructor.loading();
    }

    return (
      <div>
        <div>
          <Topic
            data={data}
            topic={topic}
            actions={actions}
          />
        </div>
      </div>
    );
  }

  static loading() {
    return (<PageLoadingIndicator />);
  }
}
