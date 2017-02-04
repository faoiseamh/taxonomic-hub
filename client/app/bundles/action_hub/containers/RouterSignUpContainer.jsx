import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import SignUpScreen from '../components/SignUpScreen/SignUpScreen';
import * as usersActionCreators from '../actions/usersActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$usersState };
}

class RouterUsersContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  };

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(usersActionCreators, dispatch);
    const locationState = this.props.location.state;

    return (
      <SignUpScreen {...{ actions, data, locationState }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterUsersContainer);
