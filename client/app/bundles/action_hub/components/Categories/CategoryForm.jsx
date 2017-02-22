import React, { PropTypes } from 'react';

import _ from 'lodash';
import { CirclePicker } from 'react-color';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import * as ButtonStyles from '../../theme/ButtonStyles';

export default class CategoryForm extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    topics: PropTypes.array,
    $$category: PropTypes.object,
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  // constructor(props, _railsContext) {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      color: '',
      deleteWarningOpen: false,
    };
    this.baseState = this.state;

    _.bindAll(this, [
      'delete',
      'submit',
      'handleChange',
      'handleClose',
      'handleColorChange',
      'hideDeleteWarning',
    ]);
  }

  componentWillReceiveProps(nextProps) {
    const { $$category } = nextProps;

    // TODO: Consider adding check to see if current category is undefined or different id?
    if ($$category && $$category !== this.props.$$category) {
      this.setState({
        title: $$category.get('title'),
        color: $$category.get('color'),
      });
    } else if (!$$category && this.props.$$category) {
      this.reset();
    }
  }

  getActionButtons() {
    const { data } = this.props;

    const buttons = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
    ];

    // Add delete button for existing categories
    if (!this.isNewCategory()) {
      buttons.push(
        <FlatButton
          label={data.get('isDeletingCategory') ? 'Deleting...' : 'Delete'}
          labelStyle={{ color: ButtonStyles.dangerBackgroundColor }}
          onTouchTap={this.delete}
          disabled={data.get('isDeletingCategory')}
        />,
      );
    }

    buttons.push(
      <FlatButton
        label={this.isNewCategory() ? 'Create Category' : 'Save'}
        onTouchTap={this.submit}
        primary
        disabled={!this.valid()}
      />,
    );
    return buttons;
  }

  handleColorChange(color) {
    this.setState({ color: color.hex });
  }

  handleClose() {
    this.props.handleClose();
  }

  handleChange(e) {
    const name = e.target.name;
    const stateChange = {};
    stateChange[name] = e.target.value;
    this.setState(stateChange);
  }

  submit(e) {
    e.preventDefault();
    const { actions } = this.props;
    actions
      .submitCategory(this.state)
      .done(() => {
        this.reset();
        this.handleClose();
      });
  }

  hideDeleteWarning() {
    this.setState({
      deleteWarningOpen: false,
    });
  }

  delete() {
    const { actions, $$category } = this.props;
    if (this.props.topics.length > 0) {
      this.setState({
        deleteWarningOpen: true,
      });
      return;
    }

    actions
      .deleteCategory($$category.toJS())
      .done(() => {
        this.reset();
        this.handleClose();
      });
  }

  isNewCategory() {
    return !this.props.$$category;
  }

  reset() {
    this.setState(this.baseState);
  }

  valid() {
    return this.state.color && this.state.title;
  }

  render() {
    const { actions, data } = this.props;
    return (
      <div>
        <Dialog
          title={this.isNewCategory() ? 'Add Category' : 'Edit Category'}
          actions={this.getActionButtons()}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          <form className="text-center" onSubmit={this.submit}>
            <div style={{ marginBottom: '25px' }}>
              <TextField
                name="title"
                id="categoryFormTitle"
                hintText="a concise title for category"
                floatingLabelText="Title"
                inputStyle={{ backgroundColor: this.state.color }}
                onChange={this.handleChange}
                value={this.state.title}
              />
            </div>
            <div>
              <div style={{ marginLeft: 'auto', marginRight: 'auto', display: 'inline-block' }}>
                <CirclePicker
                  circleSpacing={10}
                  onChangeComplete={this.handleColorChange}
                  color={this.state.color}
                />
              </div>
            </div>
          </form>
        </Dialog>
        <Snackbar
          open={this.state.deleteWarningOpen}
          message="Remove all topics from this category before deleting."
          autoHideDuration={4000}
          onRequestClose={this.hideDeleteWarning}
        />
        <Snackbar
          open={data.get('deleteCategoryError') != null}
          message="Something went wrong deleting this category."
          autoHideDuration={4000}
          onRequestClose={actions.clearDeleteCategoryFailure}
        />
      </div>
    );
  }

}
