import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import * as ButtonStyles from '../../theme/ButtonStyles';

export default class EventForm extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      eventBody: '',
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

  getSubmitButtonText() {
    const { data } = this.props;
    return data.get('isSavingEvent') ? 'Creating Event...' : 'Create Event';
  }

  submit(eventFormData) {
    const { actions } = this.props;
    const event = {
      ...eventFormData,
      body: this.state.eventBody,
    };
    actions.createEvent(event);
  }

  renderErrors() {
    const { data, actions } = this.props;
    let errorText = null;
    let errorTitle = null;
    let clearAction = null;
    if (data.get('saveEventError') != null) {
      errorTitle = 'Error saving event';
      errorText = 'Oops, something went wrong saving the event. Please try again in a moment.';
      clearAction = actions.clearSaveEventFailure;
    }

    const hasError = errorText != null;

    const dialogActions = [
      <FlatButton
        label="OK"
        primary
        onTouchTap={clearAction}
      />,
    ];
    return (
      <Dialog
        title={errorTitle}
        actions={dialogActions}
        modal={false}
        open={hasError}
        onRequestClose={clearAction}
      >
        <div>
          {errorText}
        </div>
      </Dialog>
    );
  }

  onEditorChange(value) {
    this.state.eventBody = value;
  }

  render() {
    const {
      actions,
      data,
    } = this.props;

    return (
      <div>
        {this.renderErrors()}
        <Formsy.Form
          onValidSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
        >
          <FormsyText
            name="title"
            hintText="a concise title for this event"
            floatingLabelText="Title"
            required
          />
          <br />

          <FormsyText
            name="location name"
            hintText="a concise location for this event"
            floatingLabelText="Location Name"
          />
          <br />

          <br />

          <ReactQuill
            theme="snow"
            onChange={(text) => this.onEditorChange(text)}
            defaultValue={this.state.eventBody}
          />
          <br />
          <br />

          <div className="form-buttons-inline">
            <RaisedButton
              label={this.getSubmitButtonText()}
              type="submit"
              primary
              disabled={!this.state.canSubmit || data.get('isSavingEvent')}
            />
          </div>
        </Formsy.Form>
        {/* <Snackbar
          open={data.get('isEventSavedNoticeVisible')}
          message="Event was saved successfully"
          autoHideDuration={4000}
          onRequestClose={actions.hideEventSavedNotice}
        /> */}
      </div>
    );
  }
}
