import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import Categories from '../Categories/Categories';

export default class CategoriesScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    locationState: PropTypes.object,
  };

  render() {
    const { data, actions } = this.props;

    return (
      <div>
        <div>
          <Categories
            data={data}
            actions={actions}
          />
        </div>
      </div>
    );
  }
}
