import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'libs/middlewares/loggerMiddleware'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const initialCategories = props.categories;
  const initialTopics = props.topics;
  // console.log("initialStates is pete");
  // console.log(initialStates);
  // const { $$actionHubState } = initialStates;
  const { $$categoriesState, $$topicsState } = initialStates;
  // const initialState = {};
  const initialState = {
    $$categoriesState: $$categoriesState.merge({
      $$categories: initialCategories,
    }),
    $$topicsState: $$topicsState.merge({
      $$topics: initialTopics,
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
