import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../layout/Layout';
import TestReactRouter from '../components/TestReactRouter/TestReactRouter';
import TestReactRouterRedirect from '../components/TestReactRouterRedirect/TestReactRouterRedirect';
import RouterCategoriesContainer from '../containers/RouterCategoriesContainer';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute
      component={RouterCategoriesContainer}
    />
    <Route
      path="react-router"
      component={TestReactRouter}
    />
    <Route
      path="react-router/redirect"
      component={TestReactRouterRedirect}
      onEnter={TestReactRouterRedirect.checkAuth}
    />
  </Route>
);
