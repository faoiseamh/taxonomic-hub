import React, { PropTypes } from 'react';

import { CirclePicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class CategoryForm extends React.Component {
  // static propTypes = {
  //   actions: PropTypes.object.isRequired,
  //   data: PropTypes.object.isRequired,
  // };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  // constructor(props, _railsContext) {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title ? this.props.title : '',
      color: this.props.color ? this.props.color : '',
      topics: this.props.topics ? this.props.topics : []
    };
    this.baseState = this.state;
  }

  handleColorChange = (color) => {
    this.setState({color: color.hex});
  }

  handleChange = (e) => {
    var name = e.target.name;
    let stateChange = {};
    stateChange[name] = e.target.value;
    this.setState(stateChange);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // $.post('/categories', { category: this.state }, (data) => {
    //   this.props.handleNewCategory(data);
    //   this.setState(this.baseState);
    // }, 'JSON');
    const { actions } = this.props;
    actions
      .submitCategory(this.state)
      .done(this.reset);
  }

  reset = () => {
    this.setState(this.baseState);
  }

  valid = () => {
    return this.state.color && this.state.title;
  }

  render() {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <TextField
            name='title'
            id='categoryFormTitle'
            hintText='a concise title for category'
            floatingLabelText="Title"
            inputStyle={{ backgroundColor: this.state.color }}
            onChange={this.handleChange}
            value={this.state.title}
          />
        </div>
        <div className='form-group'>
          <CirclePicker
            circleSpacing={10}
            onChangeComplete={this.handleColorChange}
            color={this.state.color}
          />
        </div>
        <RaisedButton
          label='Create category'
          type='submit'
          primary={true}
          disabled={!this.valid()}
        />
      </form>
    );
  }

}
