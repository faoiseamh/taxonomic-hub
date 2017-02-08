import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as paths from '../constants/paths';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool.isRequired,
      location: PropTypes.object,
    };

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      const { dispatch, isAuthenticated, location } = this.props;
      if (!isAuthenticated) {
        const redirectAfterLogin = location.pathname;
        dispatch(push(`${paths.USER_SIGN_IN_PATH}?next=${redirectAfterLogin}`));
      }
    }

    render() {
      const { isAuthenticated } = this.props;
      if (!isAuthenticated) {
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

  return connect(mapStateToProps)(AuthenticatedComponent);
}
