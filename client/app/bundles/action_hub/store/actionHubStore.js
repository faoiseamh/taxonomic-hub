import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'libs/middlewares/loggerMiddleware'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const initialCategories = props.categories;
  const initialTopics = props.topics;
  const initialCategoryTopicRelationships = props.category_topic_relationships;
  const initialEvents = props.events;
  const initialEventTopicRelationships = props.event_topic_relationships;
  const initialEventFavorites = props.event_favorites;
  const initialCurrentUser = props.current_user;
  const { $$actionHubState } = initialStates;
  const initialState = {
    $$actionHubStore: $$actionHubState.merge({
      $$categories: initialCategories,
      $$categoryTopicRelationships: initialCategoryTopicRelationships,
      $$topics: initialTopics,
      $$events: initialEvents,
      $$eventTopicRelationships: initialEventTopicRelationships,
      $$eventFavorites: initialEventFavorites,
      $$currentUser: initialCurrentUser,
      isAuthenticated: initialCurrentUser && initialCurrentUser != null,
    }),
    railsContext,
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
  );

  return composedStore(createStore)(reducer, initialState);
};
