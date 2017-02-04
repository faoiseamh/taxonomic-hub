/* eslint new-cap: 0 */

import Immutable from 'immutable';

// import * as actionTypes from '../constants/usersConstants';

export const $$initialState = Immutable.fromJS({
  $$currentUser: false,
});

export default function topicsReducer($$state = $$initialState, action = null) {
  const { type } = action;

  switch (type) {

    default: {
      return $$state;
    }
  }
}
