import React, { PropTypes } from 'react';

import { CirclePicker } from 'react-color';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';

export default class CategoryForm extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    title: PropTypes.string,
    color: PropTypes.string,
    topics: PropTypes.array,
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  // constructor(props, _railsContext) {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: this.props.title ? this.props.title : '',
      color: this.props.color ? this.props.color : '',
      topics: this.props.topics ? this.props.topics : [],
    };
    this.baseState = this.state;
  }

  handleColorChange = (color) => {
    this.setState({ color: color.hex });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange = (e) => {
    const name = e.target.name;
    const stateChange = {};
    stateChange[name] = e.target.value;
    this.setState(stateChange);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { actions } = this.props;
    actions
      .submitCategory(this.state)
      .done(() => {
        this.reset();
        this.handleClose();
      });
  }

  reset = () => {
    this.setState(this.baseState);
  }

  valid = () =>
    this.state.color && this.state.title;

  render() {
    return (
      <div>
        <FloatingActionButton
          onTouchTap={() => { this.setState({ open: true }); }}
          className="floating-actions-menu"
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add Category"
          actions={[
            <FlatButton
              label="Cancel"
              primary
              onTouchTap={this.handleClose}
            />,
            <FlatButton
              label="Create category"
              onTouchTap={this.handleSubmit}
              primary
              disabled={!this.valid()}
            />,
          ]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form className="text-center" onSubmit={this.handleSubmit}>
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
      </div>
    );
  }

}
