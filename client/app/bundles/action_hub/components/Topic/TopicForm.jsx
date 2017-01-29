import React, { PropTypes } from 'react';
import ReactQuill from 'react-quill';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class TopicForm extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
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

  isNewTopic() {
    return this.props.topic.get('id') === undefined;
  }


  submit(topic) {
    const { actions } = this.props;
    if (this.isNewTopic()) {
      actions.submitTopic(topic);
    } else {
      actions.updateTopic({
        ...topic,
        id: this.props.topic.get('id'),
        body: this.state.topicBody,
      });
    }
  }

  renderErrors() {
    const { data, actions } = this.props;

    let errorText = null;
    let errorTitle = null;
    if (data.$$topicsState.get('submitTopicError') != null) {
      errorTitle = 'Error saving topic';
      // errorText = data.$$topicsState.get('submitTopicError');
      errorText = 'Oops, something went wrong saving the topic. Please try again in a moment.';
    }
    const hasError = errorText != null;

    const dialogActions = [
      <FlatButton
        label="OK"
        primary
        onTouchTap={actions.clearSubmitTopicFailure}
      />,
    ];
    return (
      <Dialog
        title={errorTitle}
        actions={dialogActions}
        modal={false}
        open={hasError}
        onRequestClose={actions.clearSubmitTopicFailure}
      >
        <div>
          {errorText}
        </div>
      </Dialog>
    );
  }

  onEditorChange(value) {
    this.state.topicBody = value;
  }

  render() {
    const { data, topic } = this.props;

    // Category select menu items
    const $$categoriesSorted = data.$$categoriesState.get('$$categories').sort((a, b) => a.get('title').localeCompare(b.get('title')));
    const categoryMenuItems = $$categoriesSorted.map(($$category, index) =>
      <MenuItem
        key={$$category.get('id') || index}
        value={$$category.get('id')}
        primaryText={$$category.get('title')}
        leftIcon={<FontIcon className="material-icons" color={$$category.get('color')}>folder</FontIcon>}
      />,
    );

    this.state.topicBody = topic.get('body');

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
            hintText="a concise title for this topic"
            floatingLabelText="Title"
            value={topic.get('title')}
            required
          />
          <br />

          <FormsyText
            name="subtitle"
            hintText="a concise subtitle for this topic"
            floatingLabelText="Subtitle"
            value={topic.get('subtitle')}
            required
          />
          <br />

          <FormsySelect
            name="category_id"
            floatingLabelText="Category"
            value={topic.get('category_id')}
            required
          >
            {categoryMenuItems}
          </FormsySelect>
          <br />

          <ReactQuill
            theme="snow"
            onChange={(text) => this.onEditorChange(text)}
            defaultValue={this.state.topicBody}
          />
          <br />
          <br />

          <RaisedButton
            label={this.isNewTopic() ? 'Create Topic' : 'Save'}
            type="submit"
            primary
            disabled={!this.state.canSubmit}
          />
        </Formsy.Form>
      </div>
    );
  }
}
