import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
// import NavigationBar from '../components/NavigationBar/NavigationBar';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import './Layout.scss';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state };
}

class Layout extends BaseComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  /* eslint-disable react/no-unescaped-entities */
  render() {
    const { data } = this.props;

    return (
      <div>
        <NavigationBarContainer router={this.props.router} data={data} />
        <div className="container below-navbar">
          <section>
            {this.props.children}
          </section>
        </div>
      </div>
    );
  }
}

export default connect(select)(Layout);
