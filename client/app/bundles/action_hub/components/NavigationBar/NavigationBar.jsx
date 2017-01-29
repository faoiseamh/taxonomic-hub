// https://github.com/eslint/eslint/issues/6876
// eslint-disable new-cap

import classNames from 'classnames';
import _ from 'lodash';// eslint-disable-line no-unused-vars
import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

import * as paths from '../../constants/paths';

const NavigationBar = (props) => {
  const { pathname } = props;

  /* eslint-disable new-cap */
  return (
    <nav className="navbar navbar-default" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li>
              <IndexLink to={paths.ROUTER_PATH} activeClassName="active">Categories</IndexLink>
            </li>
            <li>
              <Link to="/react-router" activeClassName="active">
                Test React Router ('/react-router')
              </Link>
            </li>
            <li>
              <Link to="/react-router/redirect" activeClassName="active">
                Test Redirect
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

NavigationBar.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default NavigationBar;
