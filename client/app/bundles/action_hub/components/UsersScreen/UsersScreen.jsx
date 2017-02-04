import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import { Card, CardTitle, CardMedia } from 'material-ui/Card';
import SignIn from '../Users/SignIn';

import css from './UsersScreen.scss';

export default class UsersScreen extends BaseComponent {

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

  renderSignIn() {
    const { data, actions } = this.props;
    return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-xs-12">
          <Card>
            <CardTitle title="Sign In" className="text-center" />
            <CardMedia>
              <div className="text-center">
                {this.renderNotification()}
                <SignIn
                  data={data}
                  actions={actions}
                />
              </div>
            </CardMedia>
          </Card>
        </div>
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

    if ($$currentUser) {
      return this.renderProfile();
    }

    return this.renderSignIn();
  }
}
