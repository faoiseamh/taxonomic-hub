import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import configureStore from '../store/actionHubStore';
import ActionHubContainer from '../containers/ActionHubContainer';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// railsContext provides contextual information especially useful for server rendering, such as
// knowing the locale. See the React on Rails documentation for more info on the railsContext
const ActionHubApp = (props, _railsContext) => (
  <Provider store={configureStore(props)}>
    <MuiThemeProvider>
      <ActionHubContainer />
    </MuiThemeProvider>
  </Provider>
);

export default ActionHubApp;
