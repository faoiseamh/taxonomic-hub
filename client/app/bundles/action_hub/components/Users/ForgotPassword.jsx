import React, { PropTypes } from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import { renderErrorFromResponse } from 'libs/errorHelper'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import _ from 'lodash';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import * as paths from '../../constants/paths';


export default class ForgotPassword extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
    };
    this.baseState = this.state;

    _.bindAll(this, [
      'enableButton',
      'disableButton',
      'submit',
    ]);
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  submit(user) {
    const { actions } = this.props;
    actions.forgotPassword(user);
  }

  renderErrors() {
    const { actions, data } = this.props;
    const forgotPasswordError = renderErrorFromResponse(data.get('forgotPasswordError'));
    const hasError = forgotPasswordError != null;

    return (
      <Dialog
        title="Error"
        modal={false}
        open={hasError}
        onRequestClose={actions.clearForgotPasswordFailure}
      >
        <div>
          {forgotPasswordError}
        </div>
      </Dialog>
    );
  }

  render() {
    // const { actions, data } = this.props;

    return (
      <Formsy.Form
        onValidSubmit={this.submit}
        onValid={this.disableButton} // setting the state as disabled until implemented
        onInvalid={this.disableButton}
      >
        <h3 className="lead">Forgot Password</h3>
        {this.renderErrors()}
        <FormsyText
          name="email"
          hintText="you@domain.com"
          floatingLabelText="E-mail Address"
          validations="isEmail"
          validationError="This is not a valid email"
          fullWidth
          required
        />
        <br />
        <br />
        <RaisedButton
          label="Send Email"
          type="submit"
          primary
          disabled={!this.state.canSubmit}
          fullWidth
        />
        <br />
        <br />
        <Link to={paths.USER_SIGN_IN_PATH}>
          Sign In
        </Link>
        <br />
      </Formsy.Form>
    );
  }
}
