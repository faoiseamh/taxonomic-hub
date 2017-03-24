import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

export default class EventFormDialog extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      eventBody: '',
      open: props.open,

      // Event fields
      title: null,
      body: null,
      location_name: null,
    };
    this.baseState = this.state;

    _.bindAll(this, [
      'enableButton',
      'disableButton',
      'handleClose',
      'handleFormSubmit',
      'reset',
      'submit',
    ]);
  }

  componentWillReceiveProps(nextProps) {
    // Open is being changed via props
    if (this.state.open !== nextProps.open) {
      this.setState({ open: nextProps.open });
      if (!nextProps.open) {
        this.reset();
      }
    }
  }

  reset() {
    this.setState(this.baseState);
  }

  handleClose() {
    this.props.handleRequestClose();
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

  // Submit formsy form
  submit() {
    this.form.submit()
  }

  // Handle the formsy submit
  handleFormSubmit(eventFormData) {
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
      data,
    } = this.props;

    const buttons = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={this.getSubmitButtonText()}
        type="submit"
        onTouchTap={this.submit}
        primary
        disabled={!this.state.canSubmit || data.get('isSavingEvent')}
      />,
    ];

    return (
      <div>
        {this.renderErrors()}
        <Dialog
          title="Add Event"
          actions={buttons}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Formsy.Form
            onValidSubmit={this.handleFormSubmit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            ref={(form) => {
              this.form = form;
            }}
          >
            <FormsyText
              name="title"
              hintText="a concise title for this event"
              floatingLabelText="Title"
              value={this.state.title}
              required
            />
            <br />

            <FormsyText
              name="location_name"
              hintText="a concise location for this event"
              floatingLabelText="Location Name"
              value={this.state.location_name}
            />
            <br />

            <br />

            <ReactQuill
              theme="snow"
              onChange={(text) => this.onEditorChange(text)}
              defaultValue={this.state.eventBody}
              value={this.state.body}
            />
          </Formsy.Form>
        </Dialog>
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
