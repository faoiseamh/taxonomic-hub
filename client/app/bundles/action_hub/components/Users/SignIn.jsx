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
    location: PropTypes.object,
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
    const { actions, location } = this.props;
    const redirectRoute = location.query.next || paths.USER_SIGN_IN_PATH;

    actions.signIn(user, redirectRoute);
  }

  renderErrors() {
    const { actions, data } = this.props;
    const signInError = renderErrorFromResponse(data.get('signInError'));
    const hasError = signInError != null;

    const dialogActions = [
      <FlatButton
        label="OK"
        onTouchTap={actions.clearSignInFailure}
        keyboardFocused
        primary
      />,
    ];
    return (
      <Dialog
        title="Error signing in"
        actions={dialogActions}
        modal={false}
        open={hasError}
        onRequestClose={actions.clearSignInFailure}
      >
        <div>
          {signInError}
        </div>
      </Dialog>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <Formsy.Form
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        <h3 className="lead">Sign In</h3>
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
          name="password"
          floatingLabelText="Password"
          type="password"
          fullWidth
          required
        />
        <br />
        <br />
        <RaisedButton
          label={data.get('isSigningIn') ? 'Signing In...' : 'Sign In'}
          type="submit"
          disabled={!this.state.canSubmit || data.get('isSigningIn')}
          fullWidth
          primary
        />
        <br />
        <br />
        <Link to={paths.USER_FORGOT_PASSWORD_PATH} >
          Forgot Password?
        </Link>
        <br />
        <br />
        <Link to={paths.USER_SIGN_UP_PATH} >
          Sign Up
        </Link>
        <br />
      </Formsy.Form>
    );
  }
}
