/* eslint new-cap: 0 */

import Immutable from 'immutable';
import { arrayToObjectKeyedById } from 'libs/enumerableHelper'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/eventFavoritesConstants';

export const $$initialState = Immutable.fromJS({
  $$eventFavorites: {},
  isSavingEventFavorites: false,
  submitEventFavoritesError: null,
  isDeletingEvent: false,
  deleteEventError: null,
});

export default function eventFavoritesReducer($$state = $$initialState, action = null) {
  const { type, eventFavorite, error } = action;

  switch (type) {
    // Create
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

    // Delete

    case actionTypes.SET_IS_DELETING_EVENT_FAVORITE: {
      return $$state.merge({
        isDeletingEvent: true,
      });
    }

    case actionTypes.DELETE_EVENT_FAVORITE_FAILURE: {
      return $$state.merge({
        deleteEventError: error,
        isDeletingEvent: false,
      });
    }

    case actionTypes.CLEAR_DELETE_EVENT_FAVORITE_FAILURE: {
      return $$state.merge({
        deleteEventError: null,
      });
    }

    case actionTypes.DELETE_EVENT_FAVORITE_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$eventFavorites'],
            $$eventsFavorites => $$eventsFavorites.filter(($$eventFavorite) => $$eventFavorite.get('id') !== eventFavorite.id),
          )
          .merge({
            deleteEventFavoriteError: null,
            isDeletingEventFavorite: false,
          })
      ));
    }

    default: {
      return $$state;
    }
  }
}
