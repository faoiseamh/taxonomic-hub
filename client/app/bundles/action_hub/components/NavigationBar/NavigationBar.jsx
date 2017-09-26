import React, { PropTypes } from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import { IndexLink, Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import * as paths from '../../constants/paths';


export default class NavigationBar extends BaseComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    pageActions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      userMenuOpen: false,
    };
  }

  componentDidMount() {
    // this.props.router.listenBefore(this.handleLocationChange);
    this.props.router.listen(() => { this.handleLocationChange(); });
  }

  componentWillUnmount() {
    // this.props.router.removeChangeListener(this.handleLocationChange);
  }

  // Close the nav drawer on a location change
  handleLocationChange() {
    this.setState({ open: false });
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleOpenUserMenu(e) {
    this.setState({
      userMenuOpen: !this.state.userMenuOpen,
      userMenuOpenAnchorEl: e.currentTarget,
    });
  }

  closeUserMenu() {
    this.setState({
      userMenuOpen: false,
    });
  }

  logOut() {
    this.closeUserMenu();
    const { actions } = this.props;
    actions.signOut();
  }

  renderUserButton() {
    const { data } = this.props;
    const $$currentUser = data.$$usersState.get('$$currentUser');

    if ($$currentUser) {
      let userMenuLabel = $$currentUser.get('first_name');
      if (userMenuLabel === undefined || userMenuLabel == null) {
        userMenuLabel = '';
      }
      return (
        <div>
          <FlatButton
            onTouchTap={(e) => { this.handleOpenUserMenu(e); }}
            label={userMenuLabel}
            icon={<FontIcon className="material-icons">person</FontIcon>}
          />
          <Popover
            open={this.state.userMenuOpen}
            onRequestClose={() => { this.closeUserMenu(); }}
            anchorEl={this.state.userMenuOpenAnchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <Menu>
              <MenuItem
                primaryText="Profile"
                leftIcon={<FontIcon className="material-icons">person</FontIcon>}
                containerElement={<Link to={paths.USER_EDIT_PROFILE_PATH} activeClassName="active" />}// eslint-disable-line jsx-a11y/anchor-has-content
              />
              <Divider />
              <MenuItem
                primaryText="Log Out"
                leftIcon={<FontIcon className="material-icons">power_settings_new</FontIcon>}
                onTouchTap={() => { this.logOut(); }}
              />
            </Menu>
          </Popover>
        </div>
      );
    }

    return (
      <FlatButton
        containerElement={<Link to={paths.USER_SIGN_IN_PATH} activeClassName="active" />}// eslint-disable-line jsx-a11y/anchor-has-content
        label="Sign In"
      />
    );
  }

  renderEditButton() {
    const { pageActions } = this.props;

    return (
      <IconButton
        onTouchTap={pageActions.setEditMode}
      >
        <FontIcon className="material-icons">edit</FontIcon>
      </IconButton>
    );
  }

  renderSaveEditButton() {
    return (
      <FlatButton
        label="Save"
        {() => {

        }}
      />
    );
  }

  renderRightButton() {
    const { data } = this.props;
    const isEditable = data.$$pageState.get('isEditable');
    const mode = data.$$pageState.get('mode');
    const $$currentUser = data.$$usersState.get('$$currentUser');

    if ($$currentUser && isEditable) {
      if (mode == 'view') {
        return this.renderEditButton();
      } else if (mode == 'edit') {
        return this.renderSaveEditButton();
      }
    }

    return this.renderUserButton();
  }

  render() {
    return (
      <div>
        <AppBar
          title="The Current"
          iconElementRight={this.renderRightButton()}
          onLeftIconButtonTouchTap={() => { this.handleToggle(); }}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem
            containerElement={<IndexLink to={paths.EVENTS_PATH} activeClassName="active" />}
          >
            Events
          </MenuItem>
          <MenuItem
            containerElement={<IndexLink to={paths.CATEGORIES_PATH} activeClassName="active" />}
          >
            Categories
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
