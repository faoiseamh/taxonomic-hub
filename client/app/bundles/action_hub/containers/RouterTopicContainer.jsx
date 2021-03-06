import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import TopicScreen from '../components/TopicScreen/TopicScreen';
import * as TopicsActionCreators from '../actions/topicsActionCreators';
import * as query from '../reducers/queries';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    data: state.$$topicsState,
    $$categories: query.getCategories(state),
    getCategoryTopicRelationshipsWithCategoryForTopic:
      (topicId) => query.getCategoryTopicRelationshipsWithCategoryForTopic(state, topicId),
    getTopic: (topicId) => query.getTopic(state, topicId),
  };
}

class RouterTopicContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
    getTopic: PropTypes.func.isRequired,
  };

  render() {
    const { dispatch,
      data,
      location,
      getCategoryTopicRelationshipsWithCategoryForTopic,
      getTopic,
      $$categories,
    } = this.props;
    const actions = bindActionCreators(TopicsActionCreators, dispatch);
    const locationState = this.props.location.state;
    const { topicId } = this.props.routeParams;
    const $$topic = getTopic(topicId);
    const $$categoryTopicRelationships = getCategoryTopicRelationshipsWithCategoryForTopic(topicId);

    return (
      <TopicScreen
        {
          ...{
            actions,
            data,
            location,
            locationState,
            topicId,
            $$topic,
            $$categories,
            $$categoryTopicRelationships,
          }
        }
      />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterTopicContainer);
