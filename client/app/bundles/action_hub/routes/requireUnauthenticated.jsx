import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function requireUnauthenticated(Component, pathIfAuthenticated) {
  class UnauthenticatedComponent extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool.isRequired,
    };

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      const { dispatch, isAuthenticated } = this.props;
      if (isAuthenticated) {
        dispatch(push(pathIfAuthenticated));
      }
    }

    render() {
      const { isAuthenticated } = this.props;
      if (isAuthenticated) {
        return null;
      }
      return (
        <Component {...this.props} />
      );
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.$$usersState.get('isAuthenticated'),
  });

  return connect(mapStateToProps)(UnauthenticatedComponent);
}
