import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';

import { arrayToObjectKeyedById } from 'libs/enumerableHelper'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import loggerMiddleware from 'libs/middlewares/loggerMiddleware'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const initialCategories = props.categories;
  const initialCategoryTopicRelationships = props.category_topic_relationships;
  const initialTopics = props.topics;
  const initialEvents = props.events;
  const initialEventTopicRelationships = props.event_topic_relationships;
  const initialEventFavorites = props.event_favorites;
  const initialCurrentUser = props.current_user;
  const {
    $$categoriesState,
    $$categoryTopicRelationshipsState,
    $$topicsState,
    $$eventsState,
    $$eventTopicRelationshipsState,
    $$eventFavoritesState,
    $$usersState } = initialStates;
  const initialState = {
    $$categoriesState,
    $$categoryTopicRelationshipsState,
    $$topicsState,
    $$eventsState,
    $$eventTopicRelationshipsState,
    $$eventFavoritesState,
    $$usersState,
    railsContext,
  };

  // Merge in initial values if they are defined
  if (initialCategories) {
    initialState.$$categoriesState = initialState.$$categoriesState.merge({
      $$categories: arrayToObjectKeyedById(initialCategories),
    });
  }
  if (initialCategoryTopicRelationships) {
    initialState.$$categoryTopicRelationshipsState =
      initialState.$$categoryTopicRelationshipsState.merge({
        $$categoryTopicRelationships: arrayToObjectKeyedById(initialCategoryTopicRelationships),
      });
  }

  // Topics
  if (initialTopics) {
    initialState.$$topicsState = initialState.$$topicsState.merge({
      $$topics: arrayToObjectKeyedById(initialTopics),
    });
  }

  // Events and relationships
  if (initialEvents) {
    initialState.$$eventsState = initialState.$$eventsState.merge({
      $$events: arrayToObjectKeyedById(initialEvents),
    });
  }

  if (initialEventTopicRelationships) {
    initialState.$$eventTopicRelationshipsState =
      initialState.$$eventTopicRelationshipsState.merge({
        $$eventTopicRelationships: arrayToObjectKeyedById(initialEventTopicRelationships),
      });
  }

  if (initialEventFavorites) {
    initialState.$$eventFavoritesState =
      initialState.$$eventFavoritesState.merge({
        $$eventFavorites: arrayToObjectKeyedById(initialEventFavorites),
      });
  }

  if (initialCurrentUser) {
    initialState.$$usersState = initialState.$$usersState.merge({
      $$currentUser: initialCurrentUser,
      isAuthenticated: initialCurrentUser && initialCurrentUser != null,
    });
  }

  // https://github.com/reactjs/react-router-redux
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  // Sync dispatched route actions to the history
  const routerHistoryMiddleware = routerMiddleware(browserHistory);
  const finalCreateStore = compose(
    applyMiddleware(routerHistoryMiddleware, thunkMiddleware, loggerMiddleware),
  )(createStore);

  return finalCreateStore(reducer, initialState);
};
