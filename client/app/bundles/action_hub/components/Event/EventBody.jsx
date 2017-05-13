// eslint-disable react/no-danger
import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved


export default class EventBody extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    $$event: PropTypes.object.isRequired,
  };

  render() {
    const {
      $$event,
    } = this.props;

    return (
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: $$event.get('body') }} />
      </div>
    );
  }
}
