import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../layout/Layout';
import TestReactRouter from '../components/TestReactRouter/TestReactRouter';
import TestReactRouterRedirect from '../components/TestReactRouterRedirect/TestReactRouterRedirect';
import RouterCategoriesContainer from '../containers/RouterCategoriesContainer';
import RouterTopicContainer from '../containers/RouterTopicContainer';
import RouterUsersContainer from '../containers/RouterUsersContainer';
import RouterSignUpContainer from '../containers/RouterSignUpContainer';
import * as paths from '../constants/paths';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute
      component={RouterCategoriesContainer}
    />

    <Route
      path="/topics/:topicId"
      component={RouterTopicContainer}
    />

    <Route
      path={paths.USER_SIGN_IN_PATH}
      component={RouterUsersContainer}
    />
    <Route
      path={paths.USER_SIGN_UP_PATH}
      component={RouterSignUpContainer}
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
