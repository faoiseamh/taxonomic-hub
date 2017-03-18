import Immutable from 'immutable';
import * as fromCategories from './categoriesReducer';
import * as fromTopics from './topicsReducer';
import * as fromEvents from './eventsReducer';


// Category queries
export const getCategories = state => fromCategories.getCategories(state.$$categoriesState);
export const getCategory = (state, categoryId) =>
  fromCategories.getCategory(state.$$categoriesState, categoryId);

// Category topic relationship queries
// Returns an array of CategoryTopicRelationships for the given topicId
export function getCategoryTopicRelationshipsForTopic(state, topicId) {
  return state.$$categoryTopicRelationshipsState.get('$$categoryTopicRelationships').filter(($$categoryTopicRelationship) =>
    String($$categoryTopicRelationship.get('topic_id')) === String(topicId),
  ).valueSeq();
}


// Returns an array of CategoryTopicRelationships for the given topicId,
// with each relationship augmented to contain the full $$category object.
export function getCategoryTopicRelationshipsWithCategoryForTopic(state, topicId) {
  const categoryTopicRelationships = this.getCategoryTopicRelationshipsForTopic(state, topicId);
  // TODO: Don't love this naming convention to avoid clashing with parent
  // namespace. Find something better?
  const getCategoryForRelationship = ($$relationship) => this.getCategory(state, $$relationship.get('category_id'));
  return Immutable.fromJS(categoryTopicRelationships.reduce((relationships, $$relationship) => {
    const $$relationshipWithCategory = {
      ...$$relationship.toJS(),
      $$category: getCategoryForRelationship($$relationship),
    };
    relationships.push($$relationshipWithCategory);
    return relationships;
  }, []));
}

export function getCategoryTopicRelationshipsForCategory(state, categoryId) {
  return state.$$categoryTopicRelationshipsState.get('$$categoryTopicRelationships').filter(($$categoryTopicRelationship) =>
    String($$categoryTopicRelationship.get('category_id')) === String(categoryId),
  );
}


// Topic queries
export const getTopic = (state, topicId) => fromTopics.getTopic(state.$$topicsState, topicId);
// Returns an array of Topics for the given categoryId
export function getTopicsForCategory(state, categoryId) {
  const relationships = this.getCategoryTopicRelationshipsForCategory(state, categoryId);
  return relationships.reduce((topics, $$categoryTopicRelationship) => {
    topics.push(getTopic(state, $$categoryTopicRelationship.get('topic_id')));
    return topics;
  }, []);
}

// Event queries
export const getEvents = (state) => fromEvents.getEvents(state.$$eventsState);

export const getEvent = (state, eventId) => fromEvents.getEvent(state.$$eventsState, eventId);

// Event Favorites queries
// Returns an array of current favorites for the eventId

export function getEventFavoritesForEvent(state, eventId) {
  return state.$$eventFavoritesState.get('$$eventFavorites').filter(($$eventFavorites) =>
    String($$eventFavorites.get('event_id')) === String(eventId),
  ).valueSeq().toJS();
}

// Returns an array of Topics for the given eventId
export function getTopicsForEvent(state, eventId) {
  return [];
  // const relationships = this.getCategoryTopicRelationshipsForEvent(state, eventId);
  // return relationships.reduce((topics, $$categoryTopicRelationship) => {
  //   topics.push(getTopic(state, $$categoryTopicRelationship.get('topic_id')));
  //   return topics;
  // }, []);
}
