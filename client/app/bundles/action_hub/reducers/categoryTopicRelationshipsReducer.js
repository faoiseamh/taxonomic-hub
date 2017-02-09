/* eslint new-cap: 0 */

import Immutable from 'immutable';

// import * as actionTypes from '../constants/categoryTopicRelationshipsConstants';

export const $$initialState = Immutable.fromJS({
  $$categoryTopicRelationships: [],
});

export default function categoryTopicRelationshipsReducer($$state = $$initialState, action = null) {
  const { type } = action;

  switch (type) {

    default: {
      return $$state;
    }
  }
}
