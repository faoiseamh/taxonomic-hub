import React, { PropTypes } from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import { renderErrorFromResponse } from 'libs/errorHelper'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import _ from 'lodash';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import * as paths from '../../constants/paths';


export default class SignIn extends BaseComponent {
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
    actions.signUp(user);
  }

  renderErrors() {
    const { actions, data } = this.props;
    const signUpError = renderErrorFromResponse(data.get('signUpError'));
    const hasError = signUpError != null;

    const dialogActions = [
      <FlatButton
        label="OK"
        onTouchTap={actions.clearSignUpFailure}
        keyboardFocused
        primary
      />,
    ];
    return (
      <Dialog
        title="Error"
        actions={dialogActions}
        modal={false}
        open={hasError}
        onRequestClose={actions.clearSignUpFailure}
      >
        <div>
          {signUpError}
        </div>
      </Dialog>
    );
  }

  render() {
    // const { actions, data } = this.props;

    return (
      <Formsy.Form
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        <h3 className="lead">Sign Up</h3>
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
        <FormsyText
          name="first_name"
          hintText="optional"
          floatingLabelText="First Name"
          fullWidth
        />
        <br />
        <FormsyText
          name="last_name"
          hintText="optional"
          floatingLabelText="Last Name"
          fullWidth
        />
        <br />
        <FormsyText
          name="password"
          floatingLabelText="Password"
          type="password"
          fullWidth
          required
        />
        <br />
        <FormsyText
          name="password_confirmation"
          floatingLabelText="Re-type Password"
          type="password"
          fullWidth
          required
        />
        <br />
        <br />
        <RaisedButton
          label="Sign Up"
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
