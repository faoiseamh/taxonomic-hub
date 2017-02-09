import categoriesReducer, { $$initialState as $$categoriesState } from './categoriesReducer';
import categoryTopicRelationshipsReducer, { $$initialState as $$categoryTopicRelationshipsState } from './categoryTopicRelationshipsReducer';
import topicsReducer, { $$initialState as $$topicsState } from './topicsReducer';
import usersReducer, { $$initialState as $$usersState } from './usersReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$categoriesState: categoriesReducer,
  $$categoryTopicRelationshipsState: categoryTopicRelationshipsReducer,
  $$topicsState: topicsReducer,
  $$usersState: usersReducer,
  railsContext: railsContextReducer,
};


export const initialStates = {
  $$categoriesState,
  $$categoryTopicRelationshipsState,
  $$topicsState,
  $$usersState,
  railsContextState,
};
