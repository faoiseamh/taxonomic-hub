import React, { PropTypes } from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved


export default class SignIn extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { actions, data } = this.props;

    // TODO: Figure out best way to sort data in redux -- in reducer or here? Why doesn't this work?
    // const $$topic = data.get('$$topic');
    return (
      <div>
        sign in
      </div>
    );
  }
}
