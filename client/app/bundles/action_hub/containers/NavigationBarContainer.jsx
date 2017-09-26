import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import NavigationBar from '../components/NavigationBar/NavigationBar';
import * as usersActionCreators from '../actions/usersActionCreators';
import * as pageActionCreators from '../actions/pageActionCreators';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  if (state.railsContext) {
    return {
      pathname: state.railsContext.pathname,
    };
  }
  return { };
}

class NavigationBarContainer extends BaseComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, data, pathname, router } = this.props;
    const actions = bindActionCreators(usersActionCreators, dispatch);
    const pageActions = bindActionCreators(pageActionCreators, dispatch);


    return (
      <NavigationBar {...{ actions, pageActions, data, pathname, router }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(stateToProps)(NavigationBarContainer);
