import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent';
import Categories from '../Categories';

import css from './CategoriesScreen.scss';

export default class CategoriesScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    locationState: PropTypes.object,
  };

  renderNotification() {
    const { locationState } = this.props;

    if (!locationState || !locationState.redirectFrom) return null;

    return (
      <div className={`bg-success ${css.notification}`}>
        You have been redirected from
        <strong>
          {locationState.redirectFrom}
        </strong>
      </div>
    );
  }

  render() {
    const { data, actions } = this.props;

    return (
      <div>
        {this.renderNotification()}
        <div>
          <Categories
            data={data}
            actions={actions}
          />
          <div className="container">
            <a href="">
              <h3>
                <div className={css.logo} />
                Example of styling using image-url and Open Sans Light custom font
              </h3>
            </a>
            <a href="">
              <div className={css.twitterImage} />
              Rails On Maui on Twitter
            </a>
          </div>
        </div>
      </div>
    );
  }
}
