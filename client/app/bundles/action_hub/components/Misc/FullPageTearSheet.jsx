import React, { Component, PropTypes } from 'react';

class FullPageTearSheet extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      prepareStyles,
    } = this.context.muiTheme;

    const styles = {
      root: {
        marginBottom: 24,
        marginRight: 24,
        width: '100%',
      },
      bottomTear: {
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '12px',
        marginTop: '-12px',
        background: "url('/assets/bottom-tear-white-bottom.svg')",
      },
    };

    return (
      <div style={prepareStyles(styles.root)}>
        {this.props.children}
        <div style={prepareStyles(styles.bottomTear)} />
      </div>
    );
  }
}

export default FullPageTearSheet;
