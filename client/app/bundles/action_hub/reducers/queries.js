import * as fromCategories from './categoriesReducer';
import * as fromTopics from './topicsReducer';

export const getCategories = state => fromCategories.getCategories(state.$$categoriesState);

export const getTopic = (state, topicId) => fromTopics.getTopic(state.$$topicsState, topicId);

export function getTopicsForCategory(state, categoryId) {
  const relationships = state.$$categoryTopicRelationshipsState.get('$$categoryTopicRelationships').filter(($$categoryTopicRelationship) =>
    $$categoryTopicRelationship.get('category_id') === categoryId,
  );
  return relationships.reduce((topics, $$categoryTopicRelationship) => {
    topics.push(getTopic(state, $$categoryTopicRelationship.get('topic_id')));
    return topics;
  }, []);
}
