import categoriesReducer, { $$initialState as $$categoriesState } from './categoriesReducer';
import topicsReducer, { $$initialState as $$topicsState } from './topicsReducer';
import usersReducer, { $$initialState as $$usersState } from './usersReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$categoriesState: categoriesReducer,
  $$topicsState: topicsReducer,
  $$usersState: usersReducer,
  railsContext: railsContextReducer,
};


export const initialStates = {
  $$categoriesState,
  $$topicsState,
  $$usersState,
  railsContextState,
};
