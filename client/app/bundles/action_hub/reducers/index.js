import Immutable from 'immutable';
import categoriesReducer, { $$initialState as $$categoriesState } from './categoriesReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$actionHubStore: categoriesReducer,
  railsContext: railsContextReducer,
};

const $$actionHubState = Immutable.fromJS({ ...$$categoriesState, test: 'test' });

export const initialStates = {
  $$actionHubState,
  railsContextState,
};
