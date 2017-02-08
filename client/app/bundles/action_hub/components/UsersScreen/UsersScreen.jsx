import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import Profile from '../Users/Profile';
import SignIn from '../Users/SignIn';

export default class UsersScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.object,
  };

  renderSignIn() {
    const { data, actions, location } = this.props;
    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-12 text-center">
          <SignIn
            data={data}
            actions={actions}
            location={location}
          />
        </div>
      </div>
    );
  }

  renderProfile() {
    const { data, actions } = this.props;
    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-12 text-center">
          <Profile
            data={data}
            actions={actions}
          />
        </div>
      </div>
    );
  }

  render() {
    const { data } = this.props;

    const $$currentUser = data.get('$$currentUser');

    if ($$currentUser) {
      return this.renderProfile();
    }

    return this.renderSignIn();
  }
}
