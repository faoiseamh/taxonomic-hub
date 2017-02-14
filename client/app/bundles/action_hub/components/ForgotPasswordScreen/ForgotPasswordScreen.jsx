import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import ForgotPassword from '../Users/ForgotPassword';

export default class ForgotPasswordScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data, actions } = this.props;
    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-12 text-center">
          <ForgotPassword
            data={data}
            actions={actions}
          />
        </div>
      </div>
    );
  }
}
