import categoriesReducer, * as fromCategories from './categoriesReducer';
import categoryTopicRelationshipsReducer, { $$initialState as $$categoryTopicRelationshipsState } from './categoryTopicRelationshipsReducer';
import eventsReducer, { $$initialState as $$eventsState } from './eventsReducer';
import topicsReducer, { $$initialState as $$topicsState } from './topicsReducer';
import usersReducer, { $$initialState as $$usersState } from './usersReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$categoriesState: categoriesReducer,
  $$categoryTopicRelationshipsState: categoryTopicRelationshipsReducer,
  $$eventsState: eventsReducer,
  $$topicsState: topicsReducer,
  $$usersState: usersReducer,
  railsContext: railsContextReducer,
};


export const initialStates = {
  $$categoriesState: fromCategories.$$initialState,
  $$categoryTopicRelationshipsState,
  $$eventsState,
  $$topicsState,
  $$usersState,
  railsContextState,
};
