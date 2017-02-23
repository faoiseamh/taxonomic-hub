import categoriesReducer, * as fromCategories from './categoriesReducer';
import categoryTopicRelationshipsReducer, { $$initialState as $$categoryTopicRelationshipsState } from './categoryTopicRelationshipsReducer';
import eventsReducer, { $$initialState as $$eventsState } from './eventsReducer';
import eventTopicRelationshipsReducer, { $$initialState as $$eventTopicRelationshipsState } from './eventTopicRelationshipsReducer';
import topicsReducer, { $$initialState as $$topicsState } from './topicsReducer';
import usersReducer, { $$initialState as $$usersState } from './usersReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$categoriesState: categoriesReducer,
  $$categoryTopicRelationshipsState: categoryTopicRelationshipsReducer,
  $$topicsState: topicsReducer,
  $$eventsState: eventsReducer,
  $$eventTopicRelationshipsState: eventTopicRelationshipsReducer,
  $$usersState: usersReducer,
  railsContext: railsContextReducer,
};


export const initialStates = {
  $$categoriesState: fromCategories.$$initialState,
  $$categoryTopicRelationshipsState,
  $$topicsState,
  $$eventsState,
  $$eventTopicRelationshipsState,
  $$usersState,
  railsContextState,
};
