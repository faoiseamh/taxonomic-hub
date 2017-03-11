import Immutable from 'immutable';
import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import Topic from '../Topic/Topic';
import PageLoadingIndicator from '../Loaders/PageLoadingIndicator';

// import css from './TopicScreen.scss';

export default class TopicScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    topicId: PropTypes.string,
    $$categories: PropTypes.object,
    $$topic: PropTypes.object,
    $$categoryTopicRelationships: PropTypes.object.isRequired,
    locationState: PropTypes.object,
  };

  componentWillMount() {
    const { topicId } = this.props;
    const { fetchTopic } = this.props.actions;
    if (topicId) {
      fetchTopic(topicId);
    }
  }

  render() {
    const {
      data,
      actions,
      location,
      topicId,
      $$categories,
      $$categoryTopicRelationships,
    } = this.props;
    let { $$topic } = this.props;

    // Show loading screen if load is in progress
    if (data.get('isFetchingTopic')) {
      return this.constructor.loading();
    }

    // Try to fetch it
    if (topicId) {
      if (!$$topic) {
        // It might not exist yet because request is still going
        return this.constructor.loading();
      }
    } else {
      // Could set defaults here
      $$topic = Immutable.fromJS({});
    }

    return (
      <div className="container">
        <Topic
          {
            ...{
              actions,
              location,
              data,
              $$topic,
              $$categories,
              $$categoryTopicRelationships,
            }
          }
        />
      </div>
    );
  }

  static loading() {
    return (<PageLoadingIndicator />);
  }
}
