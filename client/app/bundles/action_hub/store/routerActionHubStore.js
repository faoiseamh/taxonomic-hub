import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'libs/middlewares/loggerMiddleware'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const initialCategories = props.categories;
  const { $$actionHubState } = initialStates;
  const initialState = {
    $$actionHubStore: $$actionHubState.merge({
      $$categories: initialCategories,
    }),
    railsContext,
  };

  // https://github.com/reactjs/react-router-redux
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  // Sync dispatched route actions to the history
  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
  )(createStore);

  return finalCreateStore(reducer, initialState);
};
