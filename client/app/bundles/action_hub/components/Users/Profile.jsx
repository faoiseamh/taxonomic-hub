import React, { PropTypes } from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import _ from 'lodash';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

export default class Profile extends BaseComponent {
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
    actions.signIn(user);
  }
  render() {
    const { data } = this.props;

    const $$currentUser = data.get('$$currentUser');

    return (
      <Formsy.Form
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        <h3 className="lead">Profile</h3>
        <FormsyText
          name="email"
          hintText="you@domain.com"
          floatingLabelText="E-mail Address"
          validations="isEmail"
          validationError="This is not a valid email"
          value={$$currentUser.get('email')}
          fullWidth
          required
        />
        <br />
        <FormsyText
          name="first_name"
          floatingLabelText="First Name"
          value={$$currentUser.get('first_name')}
          fullWidth
        />
        <br />
        <FormsyText
          name="last_name"
          floatingLabelText="Last Name"
          value={$$currentUser.get('last_name')}
          fullWidth
        />
        <br />
        <FormsyText
          name="password"
          floatingLabelText="New Password"
          type="password"
          fullWidth
        />
        <br />
        <FormsyText
          name="password_confirmation"
          floatingLabelText="Re-type New Password"
          type="password"
          fullWidth
        />
        <br />
        <FormsyText
          name="current_password"
          floatingLabelText="Current Password"
          type="password"
          fullWidth
          required
        />
        <br />
        <br />
        <RaisedButton
          label="Save Changes"
          type="submit"
          fullWidth
          primary
          disabled={!this.state.canSubmit}
        />
        <br />
        <br />
      </Formsy.Form>
    );
  }
}
