import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import ForgotPassword from '../Users/ForgotPassword';
import ResetPasswordSent from '../Users/ResetPasswordSent';

export default class ForgotPasswordScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data, actions } = this.props;
    const resetEmailSent = data.get('resetEmailSent');

    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-12 text-center">
          {!resetEmailSent ? <ForgotPassword data={data} actions={actions} /> :
          <ResetPasswordSent actions={actions} /> }
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.clearResetPasswordEmailSent();
  }
}
