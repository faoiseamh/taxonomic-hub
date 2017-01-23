import React, { PropTypes } from 'react';
import Categories from './Categories';
// import BaseComponent from 'libs/components/BaseComponent';
// import CategoryForm from './CategoryForm';


export default class ActionHub extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { categories: this.props.categories };
  }

  updateCategories = (categories) => {
    this.setState({ categories: categories });
  };

  render() {
    return (
      <div>Dummy</div>
    );
  }
}
