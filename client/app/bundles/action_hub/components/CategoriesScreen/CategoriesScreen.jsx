import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import Categories from '../Categories/Categories';
import CategoryForm from '../Categories/CategoryForm';

export default class CategoriesScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    $$categories: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    getTopicsForCategory: PropTypes.func.isRequired,
    locationState: PropTypes.object,
  };

  render() {
    const { data, actions, $$categories, getTopicsForCategory } = this.props;

    return (
      <div>
        <Categories {...{ actions, data, $$categories, getTopicsForCategory }} />
        <CategoryForm
          data={data}
          actions={actions}
        />
      </div>
    );
  }
}
