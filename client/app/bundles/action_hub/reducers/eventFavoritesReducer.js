/* eslint new-cap: 0 */

import Immutable from 'immutable';
import { arrayToObjectKeyedById } from 'libs/enumerableHelper'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/eventFavoritesConstants';

export const $$initialState = Immutable.fromJS({
  $$eventFavorites: {},
});

export default function eventFavoritesReducer($$state = $$initialState, action = null) {
  const { type } = action;

  switch (type) {

    default: {
      return $$state;
    }
  }
}
