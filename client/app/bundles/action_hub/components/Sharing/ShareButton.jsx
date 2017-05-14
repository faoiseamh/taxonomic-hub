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
    const xBtn = { cursor: 'pointer', float: 'right', border: 0, background: '#ffffff', borderColor: '#ffffff', outline: 'none' };

    return (
      <div>
        <RaisedButton label="ShareBar" onClick={(e) => { e.stopPropagation(); this.handleOpen() }} />
        <Dialog
          title={
            <div>
              Sharing
              <button onClick={this.handleClose} style={xBtn}>X</button>
            </div>
          }
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
