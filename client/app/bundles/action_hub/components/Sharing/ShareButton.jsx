import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';

import SharingBar from './ShareBar';

class ShareButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    _.bindAll(this, [
      'handleOpen',
      'handleClose',
    ]);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <RaisedButton label="ShareBar" onTouchTap={this.handleOpen} />
        <Dialog
          title="Share"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <SharingBar />
        </Dialog>
      </div>
    );
  }
}

export default ShareButton;
