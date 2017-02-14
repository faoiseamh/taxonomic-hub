import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../layout/Layout';
import TestReactRouter from '../components/TestReactRouter/TestReactRouter';
import TestReactRouterRedirect from '../components/TestReactRouterRedirect/TestReactRouterRedirect';
import RouterCategoriesContainer from '../containers/RouterCategoriesContainer';
import RouterTopicContainer from '../containers/RouterTopicContainer';
import RouterUsersContainer from '../containers/RouterUsersContainer';
import RouterSignUpContainer from '../containers/RouterSignUpContainer';
import RouterForgotPasswordContainer from '../containers/RouterForgotPasswordContainer';
import requireAuthentication from './requireAuthentication';
import requireUnauthenticated from './requireUnauthenticated';
import * as paths from '../constants/paths';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute
      component={requireAuthentication(RouterCategoriesContainer)}
    />

    <Route
      path="/topics/:topicId"
      component={requireAuthentication(RouterTopicContainer)}
    />

    <Route
      path={paths.USER_SIGN_IN_PATH}
      component={requireUnauthenticated(RouterUsersContainer, paths.ROOT_PATH)}
    />
    <Route
      path={paths.USER_SIGN_UP_PATH}
      component={requireUnauthenticated(RouterSignUpContainer, paths.USER_EDIT_PROFILE_PATH)}
    />
    <Route
      path={paths.USER_FORGOT_PASSWORD_PATH}
      component={requireUnauthenticated(RouterForgotPasswordContainer
        , paths.USER_EDIT_PROFILE_PATH)}
    />
    <Route
      path={paths.USER_EDIT_PROFILE_PATH}
      component={requireAuthentication(RouterUsersContainer)}
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
