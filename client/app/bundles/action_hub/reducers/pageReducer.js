/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/pageConstants';

export const $$initialState = Immutable.fromJS({
  isEditable: false,
  mode: 'view',
});

export default function pageReducer($$state = $$initialState, action = null) {
  const { type } = action;

  switch (type) {

    case actionTypes.SET_PAGE_IS_EDITABLE: {
      return $$state.merge({
        isEditable: true,
      });
    }

    case actionTypes.SET_PAGE_NOT_EDITABLE: {
      return $$state.merge({
        isEditable: false,
      });
    }

    case actionTypes.SET_EDIT_MODE: {
      return $$state.merge({
        mode: 'edit',
      });
    }

    case actionTypes.EDIT_SUCCESS: {
      return $$state.merge({
        mode: 'view',
      });
    }

    default: {
      return $$state;
    }
  }
}
