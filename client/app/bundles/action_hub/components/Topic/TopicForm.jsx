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

import TopicCategoryRelationshipMultiselect from './TopicCategoryRelationshipMultiselect';

export default class TopicForm extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    $$categoryTopicRelationships: PropTypes.object.isRequired,
    $$topic: PropTypes.object.isRequired,
  };


  constructor(props) {
    super(props);

    // why is this reduce returning the full object?? figure it out!
    const selectedCategories = props.$$categoryTopicRelationships.reduce(
      (categories, $$relationship) => {
        categories.push($$relationship.get('category_id'));
        return categories;
      }, [],
    );

    this.state = {
      canSubmit: false,
      // TODO: This is duplicated from categoriesReducer. We should probably just pass JS directly
      // into there / centralize this somehow.
      selectedCategories,
    };
    this.baseState = this.state;

    _.bindAll(this, [
      'enableButton',
      'disableButton',
      'handleCategoriesChange',
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
    if (this.isNewTopic()) {
      return data.get('isSavingTopic') ? 'Creating Topic...' : 'Create Topic';
    }
    return data.get('isSavingTopic') ? 'Saving...' : 'Save';
  }

  handleCategoriesChange(categoryTopicRelationships) {
    this.setState({
      selectedCategories: categoryTopicRelationships.map(
        (relationship) => ({
          id: relationship.id,
          category_id: relationship.category_id,
          _destroy: relationship._destroy, // eslint-disable-line no-underscore-dangle
        }),
      ),
    });
  }

  isNewTopic() {
    const { $$topic } = this.props;
    return $$topic.get('id') === undefined;
  }


  submit(topic) {
    const { actions } = this.props;
    if (this.isNewTopic()) {
      actions.createTopic(topic);
    } else {
      actions.updateTopic({
        ...topic,
        id: this.props.$$topic.get('id'),
        body: this.state.topicBody,
        category_topic_relationships_attributes: this.state.selectedCategories,
      });
    }
  }

  renderErrors() {
    const { data, actions } = this.props;

    let errorText = null;
    let errorTitle = null;
    if (data.get('saveTopicError') != null) {
      errorTitle = 'Error saving topic';
      // errorText = data.$$topicsState.get('saveTopicError');
      errorText = 'Oops, something went wrong saving the topic. Please try again in a moment.';
    }
    const hasError = errorText != null;

    const dialogActions = [
      <FlatButton
        label="OK"
        primary
        onTouchTap={actions.clearSaveTopicFailure}
      />,
    ];
    return (
      <Dialog
        title={errorTitle}
        actions={dialogActions}
        modal={false}
        open={hasError}
        onRequestClose={actions.clearSaveTopicFailure}
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
    const { actions, data, $$topic, $$categories, $$categoryTopicRelationships } = this.props;

    this.state.topicBody = $$topic.get('body');

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
            value={$$topic.get('title')}
            required
          />
          <br />

          <FormsyText
            name="subtitle"
            hintText="a concise subtitle for this topic"
            floatingLabelText="Subtitle"
            value={$$topic.get('subtitle')}
            required
          />
          <br />

          <TopicCategoryRelationshipMultiselect
            onChange={this.handleCategoriesChange}
            $$categories={$$categories}
            $$categoryTopicRelationships={$$categoryTopicRelationships}
            name="categoryTopicRelationships"
            required
          />
          <br />

          <ReactQuill
            theme="snow"
            onChange={(text) => this.onEditorChange(text)}
            defaultValue={this.state.topicBody}
          />
          <br />
          <br />

          <RaisedButton
            label={this.getSubmitButtonText()}
            type="submit"
            primary
            disabled={!this.state.canSubmit || data.get('isSavingTopic')}
          />
        </Formsy.Form>
        <Snackbar
          open={data.get('isTopicSavedNoticeVisible')}
          message="Topic was saved successfully"
          autoHideDuration={4000}
          onRequestClose={actions.hideTopicSavedNotice}
        />
      </div>
    );
  }
}
