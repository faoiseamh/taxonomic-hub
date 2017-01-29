import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import Topic from '../Topic/Topic';
import PageLoadingIndicator from '../Loaders/PageLoadingIndicator';

// import css from './TopicScreen.scss';

export default class TopicScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    locationState: PropTypes.object,
  };

  componentDidMount() {
    const { topicId } = this.props;
    const { fetchTopic } = this.props.actions;
    fetchTopic(topicId);
  }

  render() {
    const { data, actions } = this.props;

    if (data.get('isFetchingTopic')) {
      return (<PageLoadingIndicator />);
    }

    return (
      <div>
        <div>
          <Topic
            data={data}
            actions={actions}
          />
        </div>
      </div>
    );
  }
}
