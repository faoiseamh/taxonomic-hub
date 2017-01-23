/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/categoriesConstants';

export const $$initialState = Immutable.fromJS({
  $$categories: [],
  fetchCategoryError: null,
  submitCategoryError: null,
  isFetching: false,
  isSaving: false,
});

export default function categoriesReducer($$state = $$initialState, action = null) {
  const { type, category, categories, error } = action;

  switch (type) {

  case actionTypes.FETCH_CATEGORIES_SUCCESS: {
    return $$state.merge({
      $$categories: categories,
      fetchCategoryError: null,
      isFetching: false,
    });
  }

  case actionTypes.FETCH_CATEGORIES_FAILURE: {
    return $$state.merge({
      fetchCategoryError: error,
      isFetching: false,
    });
  }

  case actionTypes.SUBMIT_CATEGORY_SUCCESS: {
    return $$state.withMutations(state => (
      state
        .updateIn(
          ['$$categories'],
          $$categories => $$categories.unshift(Immutable.fromJS(category)),
        )
        .merge({
          submitCategoryError: null,
          isSaving: false,
        })
    ));
  }

  case actionTypes.SUBMIT_CATEGORY_FAILURE: {
    return $$state.merge({
      submitCategoryError: error,
      isSaving: false,
    });
  }

  case actionTypes.SET_IS_FETCHING: {
    return $$state.merge({
      isFetching: true,
    });
  }

  case actionTypes.SET_IS_SAVING: {
    return $$state.merge({
      isSaving: true,
    });
  }

  default: {
    return $$state;
  }
  }
}
