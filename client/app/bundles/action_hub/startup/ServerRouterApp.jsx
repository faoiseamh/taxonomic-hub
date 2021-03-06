// Compare to ../ClientRouterApp.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import ReactOnRails from 'react-on-rails';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import theme from '../theme/ActionHubDefault';
import routes from '../routes/routes';

injectTapEventPlugin();

export default (_props, railsContext) => {
  const store = ReactOnRails.getStore('routerActionHubStore');

  let error;
  let redirectLocation;
  let routeProps;
  const { location } = railsContext;

  // See https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ routes, location }, (_error, _redirectLocation, _routeProps) => {
    error = _error;
    redirectLocation = _redirectLocation;
    routeProps = _routeProps;
  });

  // This tell react_on_rails to skip server rendering any HTML. Note, client rendering
  // will handle the redirect. What's key is that we don't try to render.
  // Critical to return the Object properties to match this { error, redirectLocation }
  if (error || redirectLocation) {
    return { error, redirectLocation };
  }
  // Important that you don't do this if you are redirecting or have an error.
  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(theme, { userAgent: _props.userAgent })}>
        <RouterContext {...routeProps} />
      </MuiThemeProvider>
    </Provider>
  );
};
