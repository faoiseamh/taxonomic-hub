import categoriesReducer, { $$initialState as $$categoriesState } from './categoriesReducer';
import topicsReducer, { $$initialState as $$topicsState } from './topicsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$categoriesState: categoriesReducer,
  $$topicsState: topicsReducer,
  railsContext: railsContextReducer,
};


export const initialStates = {
  $$categoriesState,
  $$topicsState,
  railsContextState,
};
