import ReactOnRails from 'react-on-rails';

import ActionHubApp from './ActionHubApp';
import routerCategoriesStore from '../store/routerCategoriesStore';
import categoriesStore from '../store/categoriesStore';
// import NavigationBarApp from './NavigationBarApp';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  // App,
  ActionHubApp,
  // NavigationBarApp,
});

ReactOnRails.registerStore({
  routerCategoriesStore,
  categoriesStore,
});
