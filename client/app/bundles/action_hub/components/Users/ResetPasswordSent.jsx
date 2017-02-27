import React from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

export default class ResetPasswordSent extends BaseComponent {

  render() {
    return (
      <div>
        <h3 className="lead">Reset Password Email Sent</h3>
        <br />
        Please check your email to find a link to reset your password.
      </div>
    );
  }

}
