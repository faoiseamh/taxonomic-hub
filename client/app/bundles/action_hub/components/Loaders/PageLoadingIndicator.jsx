import React from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import CircularProgress from 'material-ui/CircularProgress';

export default class PageLoadingIndicator extends BaseComponent {

  render() {
    return (
      <CircularProgress size={80} thickness={5} />
    );
  }
}
