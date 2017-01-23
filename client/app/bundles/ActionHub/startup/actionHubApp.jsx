// Entry point for routable single page app
import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import routes from '../routes/routes';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('routerCategoriesStore');

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );

  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={history}>
          {routes}
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};
