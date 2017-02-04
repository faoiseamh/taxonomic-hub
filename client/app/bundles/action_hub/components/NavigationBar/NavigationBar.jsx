import React, { PropTypes } from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import { IndexLink } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';

import * as paths from '../../constants/paths';


export default class NavigationBar extends BaseComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <AppBar
          title="Action Hub"
          iconElementRight={<FlatButton label="Login" />}
          onLeftIconButtonTouchTap={() => { this.handleToggle(); }}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem
            containerElement={<IndexLink to={paths.ROUTER_PATH} activeClassName="active"/>}
          >
            Categories
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
