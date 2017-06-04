import categoriesReducer, * as fromCategories from './categoriesReducer';
import categoryTopicRelationshipsReducer, { $$initialState as $$categoryTopicRelationshipsState } from './categoryTopicRelationshipsReducer';
import eventsReducer, { $$initialState as $$eventsState } from './eventsReducer';
import eventTopicRelationshipsReducer, { $$initialState as $$eventTopicRelationshipsState } from './eventTopicRelationshipsReducer';
import eventFavoritesReducer, { $$initialState as $$eventFavoritesState } from './eventFavoritesReducer';
import pageReducer, { $$initialState as $$pageState } from './pageReducer';
import topicsReducer, { $$initialState as $$topicsState } from './topicsReducer';
import usersReducer, { $$initialState as $$usersState } from './usersReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$categoriesState: categoriesReducer,
  $$categoryTopicRelationshipsState: categoryTopicRelationshipsReducer,
  $$eventsState: eventsReducer,
  $$eventTopicRelationshipsState: eventTopicRelationshipsReducer,
  $$eventFavoritesState: eventFavoritesReducer,
  $$pageState: pageReducer,
  $$topicsState: topicsReducer,
  $$usersState: usersReducer,
  railsContext: railsContextReducer,
};


export const initialStates = {
  $$categoriesState: fromCategories.$$initialState,
  $$categoryTopicRelationshipsState,
  $$eventsState,
  $$eventTopicRelationshipsState,
  $$eventFavoritesState,
  $$pageState,
  $$topicsState,
  $$usersState,
  railsContextState,
};
