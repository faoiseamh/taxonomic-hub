/* eslint new-cap: 0 */

import Immutable from 'immutable';
import { arrayToObjectKeyedById } from 'libs/enumerableHelper'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/eventFavoritesConstants';

export const $$initialState = Immutable.fromJS({
  $$eventFavorites: {},
  isSavingEventFavorites: false,
  submitEventFavoritesError: null,
});

export default function eventFavoritesReducer($$state = $$initialState, action = null) {
  const { type, eventFavorite } = action;

  switch (type) {
    case actionTypes.SET_IS_SAVING_EVENT_FAVORITES: {
      return $$state.merge({
        isSavingEventFavorites: true,
      });
    }

    case actionTypes.CREATE_EVENT_FAVORITE_SUCCESS: {
      // All this does is insert a new field in the $$eventFavoritesState immutable object
      // The key is the new event favorite id and the value is the event favorite object
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$eventFavorites'],
            $$eventFavorites => Immutable.fromJS({
              ...$$eventFavorites.toJS(),
              [eventFavorite.id]: eventFavorite,
            }),
          )
          .merge({
            submitEventFavoritesError: null,
            isSavingEventFavorites: false,
          })
      ));
    }

    default: {
      return $$state;
    }
  }
}
