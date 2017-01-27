import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import './Layout.scss';

export default class Layout extends BaseComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  /* eslint-disable react/no-unescaped-entities */
  render() {
    return (
      <section>
        <header>
          React router testing...
          <ul>
            <li>
              <IndexLink to="/" activeClassName="active">
                Admin / Categories editing (Root URL)
              </IndexLink>
            </li>
            <li>
              <Link to="/react-router" activeClassName="active">
                Test React Router ('/react-router')
              </Link>
            </li>
            <li>
              <Link to="/react-router/redirect" activeClassName="active">
                Test Redirect
                (url to '/react-router/redirect' which goes to root '/')
              </Link>
            </li>
          </ul>
        </header>
        {this.props.children}
      </section>
    );
  }
}