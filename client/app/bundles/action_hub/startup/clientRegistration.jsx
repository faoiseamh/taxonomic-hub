import ReactOnRails from 'react-on-rails';

import RouterApp from './ClientRouterApp';
import routerCategoriesStore from '../store/routerCategoriesStore';
import categoriesStore from '../store/categoriesStore';
import NavigationBarApp from './NavigationBarApp';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  RouterApp,
  NavigationBarApp,
});

ReactOnRails.registerStore({
  routerCategoriesStore,
  categoriesStore,
});
