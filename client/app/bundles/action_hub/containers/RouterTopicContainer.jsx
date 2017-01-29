import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import TopicScreen from '../components/TopicScreen/TopicScreen';
import * as TopicsActionCreators from '../actions/topicsActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    data: {
      $$categoriesState: state.$$categoriesState,
      $$topicsState: state.$$topicsState,
    },
  };
}

class RouterTopicContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  };

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(TopicsActionCreators, dispatch);
    const locationState = this.props.location.state;
    const { topicId } = this.props.routeParams;

    // console.log("pete RouterTopicContainer");
    // console.log(this.props);

    return (
      <TopicScreen {...{ actions, data, locationState, topicId }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterTopicContainer);
