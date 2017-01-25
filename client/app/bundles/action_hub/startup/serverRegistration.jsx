// Example of React + Redux
import ReactOnRails from 'react-on-rails';

import RouterApp from './ServerRouterApp';
import NavigationBarApp from './NavigationBarApp';
import routerCategoriesStore from '../store/routerCategoriesStore';
import categoriesStore from '../store/categoriesStore';

ReactOnRails.register(
  {
    RouterApp,
    NavigationBarApp,
  },
);

ReactOnRails.registerStore({
  routerCategoriesStore,
  categoriesStore,
});
