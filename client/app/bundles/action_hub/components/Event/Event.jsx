import React, { PropTypes } from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import EventForm from './EventForm';

export default class Event extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const {
      actions,
      data,
    } = this.props;

    // TODO: Figure out best way to sort data in redux -- in reducer or here? Why doesn't this work?
    return (
      <div>
        <EventForm
          {
            ...{
              actions,
              data,
            }
          }
        />
      </div>
    );
  }
}
