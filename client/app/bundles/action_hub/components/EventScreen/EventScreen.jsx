import Immutable from 'immutable';
import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import Event from '../Event/Event';
import PageLoadingIndicator from '../Loaders/PageLoadingIndicator';

// import css from './EventScreen.scss';

export default class EventScreen extends BaseComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    $$event: PropTypes.object,
    locationState: PropTypes.object,

  };

  render() {
    const {
      data,
      actions,
      location,
    } = this.props;
    let { $$event } = this.props;

    // Could set defaults here
    $$event = Immutable.fromJS({});
    return (
      <div>
        <div>
          <Event
            {
              ...{
                actions,
                location,
                data,
                $$event,
              }
            }
          />
        </div>
      </div>
    );
  }

  static loading() {
    return (<PageLoadingIndicator />);
  }
}
