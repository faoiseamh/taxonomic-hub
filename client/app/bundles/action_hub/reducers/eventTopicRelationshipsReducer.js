/* eslint new-cap: 0 */

import Immutable from 'immutable';
import { arrayToObjectKeyedById } from 'libs/enumerableHelper'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/eventTopicRelationshipsConstants';

export const $$initialState = Immutable.fromJS({
  $$eventTopicRelationships: {},
});

export default function eventTopicRelationshipsReducer($$state = $$initialState, action = null) {
  const { type, topic, eventTopicRelationships } = action;

  switch (type) {

    default: {
      return $$state;
    }
  }
}
