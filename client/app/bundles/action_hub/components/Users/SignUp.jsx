import React, { PropTypes } from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import _ from 'lodash';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
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
  render() {
    // const { actions, data } = this.props;

    return (
      <Formsy.Form
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        <h3 className="lead">Sign Up</h3>
        <FormsyText
          name="email"
          hintText="you@domain.com"
          floatingLabelText="E-mail Address"
          validations="isEmail"
          validationError="This is not a valid email"
          required
        />
        <br />
        <FormsyText
          name="first_name"
          hintText="optional"
          floatingLabelText="First Name"
        />
        <br />
        <FormsyText
          name="last_name"
          hintText="optional"
          floatingLabelText="Last Name"
        />
        <br />
        <FormsyText
          name="password"
          floatingLabelText="Password"
          type="password"
          required
        />
        <br />
        <FormsyText
          name="password_confirmation"
          floatingLabelText="Re-type Password"
          type="password"
          required
        />
        <br />
        <br />
        <RaisedButton
          label="Sign Up"
          type="submit"
          style={{ width: '200px' }}
          primary
          disabled={!this.state.canSubmit}
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
