import ReactOnRails from 'react-on-rails';

import RouterApp from './ClientRouterApp';
import routerActionHubStore from '../store/routerActionHubStore';
import actionHubStore from '../store/actionHubStore';
import NavigationBarApp from './NavigationBarApp';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  RouterApp,
  NavigationBarApp,
});

ReactOnRails.registerStore({
  routerActionHubStore,
  actionHubStore,
});
