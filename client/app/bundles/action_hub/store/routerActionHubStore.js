import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'libs/middlewares/loggerMiddleware'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const initialCategories = props.categories;
  const initialTopics = props.topics;
  const initialCurrentUser = props.current_user;
  const initialCategoryTopicRelationships = props.category_topic_relationships;
  const {
    $$categoriesState,
    $$categoryTopicRelationshipsState,
    $$topicsState,
    $$usersState } = initialStates;
  const initialState = {
    $$categoriesState,
    $$categoryTopicRelationshipsState,
    $$topicsState,
    $$usersState,
    railsContext,
  };

  // Merge in initial values if they are defined
  if (initialCategories) {
    initialState.$$categoriesState = initialState.$$categoriesState.merge({
      $$categories: initialCategories,
    });
  }
  if (initialTopics) {
    initialState.$$topicsState = initialState.$$topicsState.merge({
      $$topics: initialTopics,
    });
  }
  if (initialCategoryTopicRelationships) {
    initialState.$$categoryTopicRelationshipsState = initialState.$$categoryTopicRelationshipsState.merge({
      $$categoryTopicRelationships: initialCategoryTopicRelationships,
    });
  }

  if (initialCurrentUser) {
    initialState.$$usersState = initialState.$$usersState.merge({
      $$currentUser: initialCurrentUser,
      isAuthenticated: initialCurrentUser && initialCurrentUser != null,
    });
  }

  // https://github.com/reactjs/react-router-redux
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  // Sync dispatched route actions to the history
  const routerHistoryMiddleware = routerMiddleware(browserHistory);
  const finalCreateStore = compose(
    applyMiddleware(routerHistoryMiddleware, thunkMiddleware, loggerMiddleware),
  )(createStore);

  return finalCreateStore(reducer, initialState);
};
