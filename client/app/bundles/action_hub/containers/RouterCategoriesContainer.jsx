import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import * as query from '../reducers/queries';

import CategoriesScreen from '../components/CategoriesScreen/CategoriesScreen';
import * as categoriesActionCreators from '../actions/categoriesActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    data: state.$$categoriesState,
    $$categories: query.getCategories(state),
    getTopicsForCategory: (categoryId) => query.getTopicsForCategory(state, categoryId),
  };
}

class RouterCategoriesContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
    $$categories: PropTypes.object.isRequired,
    getTopicsForCategory: PropTypes.func.isRequired,
  };

  render() {
    const { dispatch, data, $$categories, getTopicsForCategory } = this.props;
    const actions = bindActionCreators(categoriesActionCreators, dispatch);
    const locationState = this.props.location.state;

    return (
      <CategoriesScreen {...{ actions, data, locationState, $$categories, getTopicsForCategory }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterCategoriesContainer);
