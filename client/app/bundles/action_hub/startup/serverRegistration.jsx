// Example of React + Redux
import ReactOnRails from 'react-on-rails';

import RouterApp from './ServerRouterApp';
import NavigationBarApp from './NavigationBarApp';
import routerActionHubStore from '../store/routerActionHubStore';
import actionHubStore from '../store/actionHubStore';

ReactOnRails.register(
  {
    RouterApp,
    NavigationBarApp,
  },
);

ReactOnRails.registerStore({
  routerActionHubStore,
  actionHubStore,
});
