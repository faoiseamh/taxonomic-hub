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

// import TopicCategoryRelationshipMultiselect from './TopicCategoryRelationshipMultiselect';
import TagEditor from '../TagEditor/TagEditor';

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
      topicBody: this.props.$$topic ? this.props.$$topic.get('body') : '',
      showConfirmDelete: false,
      // TODO: This is duplicated from categoriesReducer. We should probably just pass JS directly
      // into there / centralize this somehow.
      selectedCategories,
    };
    this.baseState = this.state;

    _.bindAll(this, [
      'showConfirmDelete',
      'hideConfirmDelete',
      'delete',
      'enableButton',
      'disableButton',
      'handleCategoriesChange',
      'submit',
    ]);
  }

  showConfirmDelete() {
    this.setState({
      showConfirmDelete: true,
    });
  }

  hideConfirmDelete() {
    this.setState({
      showConfirmDelete: false,
    });
  }

  delete() {
    const { actions, $$topic } = this.props;
    this.hideConfirmDelete();
    actions.deleteTopic($$topic.toJS());
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


  submit(topicFormData) {
    const { actions } = this.props;
    const topic = {
      ...topicFormData,
      body: this.state.topicBody,
      category_topic_relationships_attributes: this.state.selectedCategories,
    };
    if (this.isNewTopic()) {
      actions.createTopic(topic);
    } else {
      actions.updateTopic({
        ...topic,
        id: this.props.$$topic.get('id'),
      });
    }
  }

  renderErrors() {
    const { data, actions } = this.props;

    let errorText = null;
    let errorTitle = null;
    let clearAction = null;
    if (data.get('saveTopicError') != null) {
      errorTitle = 'Error saving topic';
      errorText = 'Oops, something went wrong saving the topic. Please try again in a moment.';
      clearAction = actions.clearSaveTopicFailure;
    } else if (data.get('deleteTopicError') != null) {
      errorTitle = 'Error deleting topic';
      errorText = 'Oops, something went wrong deleting the topic. Please try again in a moment.';
      clearAction = actions.clearDeleteTopicFailure;
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
    this.state.topicBody = value;
  }

  render() {
    const {
      actions,
      data,
      location,
      $$topic,
      $$categories,
      $$categoryTopicRelationships,
    } = this.props;
    let initialCategoryId;
    if (location.query && location.query.category_id) {
      initialCategoryId = parseInt(location.query.category_id);
    }

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
          />
          <br />

          <TagEditor
            initialObjectId={initialCategoryId}
            onChange={this.handleCategoriesChange}
            $$objects={$$categories}
            $$relationships={$$categoryTopicRelationships}
            objectName="category"
            relationshipName="categoryTopicRelationships"
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

          <div className="form-buttons-inline">
            <RaisedButton
              label={this.getSubmitButtonText()}
              type="submit"
              primary
              disabled={!this.state.canSubmit || data.get('isSavingTopic')}
            />

            { this.isNewTopic() ? null :
            <RaisedButton
              label={data.get('isDeletingTopic') ? 'Deleting...' : 'Delete'}
              backgroundColor={ButtonStyles.dangerBackgroundColor}
              labelColor={ButtonStyles.dangerTextColor}
              onClick={this.showConfirmDelete}
              disabled={data.get('isDeletingTopic')}
            />
            }

            <Dialog
              title="Delete Topic"
              actions={[
                <FlatButton
                  label="Cancel"
                  onTouchTap={this.hideConfirmDelete}
                />,
                <FlatButton
                  label="Delete Topic"
                  labelStyle={{ color: ButtonStyles.dangerBackgroundColor }}
                  onTouchTap={this.delete}
                />,
              ]}
              modal={false}
              open={this.state.showConfirmDelete}
              onRequestClose={this.hideConfirmDelete}
            >
              Are you sure you want to delete this topic?
            </Dialog>


          </div>
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
