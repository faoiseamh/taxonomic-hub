import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import * as query from '../reducers/queries';

import EventScreen from '../components/EventScreen/EventScreen';
import * as eventsActionCreators from '../actions/eventsActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    data: state.$$eventsState,
    getEvent: (eventId) => query.getEvent(state, eventId),
    getTopicsForEvent: (eventId) => query.getTopicsForEvent(state, eventId),
    getCategoriesForTopic: (topicId) => query.getCategoriesForTopic(state, topicId),
  };
}

class RouterEventContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
    getEvent: PropTypes.func.isRequired,
    getTopicsForEvent: PropTypes.func.isRequired,
    getCategoriesForTopic: PropTypes.func.isRequired,
  };

  render() {
    const {
      dispatch,
      data,
      getEvent,
      getTopicsForEvent,
      getCategoriesForTopic,
    } = this.props;
    const { eventId } = this.props.routeParams;
    const actions = bindActionCreators(eventsActionCreators, dispatch);
    const locationState = this.props.location.state;

    const $$event = getEvent(eventId);
    const topics = getTopicsForEvent(eventId);

    return (
      <EventScreen
        {
          ...{
            actions,
            data,
            locationState,
            $$event,
            topics,
            getCategoriesForTopic,
          }
        }
      />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterEventContainer);
