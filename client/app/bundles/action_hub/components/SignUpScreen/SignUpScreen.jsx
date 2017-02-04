import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import SignUp from '../Users/SignUp';

import css from './SignUpScreen.scss';

export default class SignUpScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    locationState: PropTypes.object,
  };

  renderNotification() {
    const { locationState } = this.props;

    if (!locationState || !locationState.redirectFrom) return null;

    return (
      <div className={`bg-success ${css.notification}`}>
        You have been redirected from
        <strong>
          {locationState.redirectFrom}
        </strong>
      </div>
    );
  }

  renderSignUp() {
    const { data, actions } = this.props;
    return (
      <div className="text-center">
        {this.renderNotification()}
        <SignUp
          data={data}
          actions={actions}
        />
      </div>
    );
  }

  renderProfile() {
    const { data, actions } = this.props;
    return (
      <div
        data={data}
        actions={actions}
      >
        Profile
      </div>
    );
  }

  render() {
    const { data } = this.props;

    const $$currentUser = data.get('$$currentUser');

    return this.renderSignUp();
  }
}
