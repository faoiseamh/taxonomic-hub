/* eslint new-cap: 0 */

import Immutable from 'immutable';
import { arrayToObjectKeyedById } from 'libs/enumerableHelper'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/categoryTopicRelationshipsConstants';

export const $$initialState = Immutable.fromJS({
  $$categoryTopicRelationships: {},
});

export default function categoryTopicRelationshipsReducer($$state = $$initialState, action = null) {
  const { type, topic, categoryTopicRelationships } = action;

  switch (type) {

    case actionTypes.UPDATE_CATEGORY_TOPIC_RELATIONSHIPS_FOR_TOPIC: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$categoryTopicRelationships'],
            $$categoryTopicRelationships => {
              // Remove all relationships for this topic
              let relationshipsArray = $$categoryTopicRelationships.valueSeq().toArray();
              relationshipsArray = relationshipsArray.filter(
                (relationship) => relationship.topic_id === topic.id,
              );
              // Add new relationships
              relationshipsArray = relationshipsArray.concat(categoryTopicRelationships);
              // Convert back to Immutable
              return Immutable.fromJS(arrayToObjectKeyedById(relationshipsArray));
            },
          )
      ));
    }

    default: {
      return $$state;
    }
  }
}
