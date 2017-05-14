/* eslint new-cap: 0 */

import Immutable from 'immutable';
import { arrayToObjectKeyedById } from 'libs/enumerableHelper'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/eventTopicRelationshipsConstants';

export const $$initialState = Immutable.fromJS({
  $$eventTopicRelationships: {},
});

export default function eventTopicRelationshipsReducer($$state = $$initialState, action = null) {
  const { type, event, eventTopicRelationships } = action;

  switch (type) {

    case actionTypes.UPDATE_EVENT_TOPIC_RELATIONSHIPS_FOR_EVENT: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$eventTopicRelationships'],
            $$eventTopicRelationships => {
              // Remove all relationships for this topic
              let relationshipsArray = $$eventTopicRelationships.valueSeq().toJS();
              relationshipsArray = relationshipsArray.filter(
                (relationship) => relationship.event_id !== event.id,
              );
              // Add new relationships
              relationshipsArray = relationshipsArray.concat(eventTopicRelationships);
              // Convert back to Immutable
              return Immutable.fromJS(arrayToObjectKeyedById(relationshipsArray));
            },
          )
      ));
    }

    case actionTypes.DELETE_EVENT_TOPIC_RELATIONSHIPS_FOR_EVENT: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$eventTopicRelationships'],
            $$eventTopicRelationships => {
              // Remove all relationships for this event
              let relationshipsArray = $$eventTopicRelationships.valueSeq().toJS();
              relationshipsArray = relationshipsArray.filter(
                (relationship) => relationship.event_id !== event.id,
              );
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
