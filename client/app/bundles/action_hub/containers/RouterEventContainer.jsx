
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import EventScreen from '../components/EventScreen/EventScreen';
import * as EventsActionCreators from '../actions/eventsActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    data: state.$$eventsState,
  };
}

class RouterEventContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch,
      data,
    } = this.props;
    const actions = bindActionCreators(EventsActionCreators, dispatch);

    return (
      <EventScreen
        {
          ...{
            actions,
            data,
          }
        }
      />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterEventContainer);
