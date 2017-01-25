import categoriesReducer, { $$initialState as $$categoriesState } from './categoriesReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$categoriesStore: categoriesReducer,
  railsContext: railsContextReducer,
};

export const initialStates = {
  $$categoriesState,
  railsContextState,
};
