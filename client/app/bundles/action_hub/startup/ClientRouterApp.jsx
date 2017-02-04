// Compare to ../ServerRouterApp.jsx
import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import theme from '../theme/ActionHubDefault';
import routes from '../routes/routes';

injectTapEventPlugin();

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('routerActionHubStore');

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );

  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={theme}>
        <Router history={history}>
          {routes}
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};
