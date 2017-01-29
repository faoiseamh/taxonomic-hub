/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/categoriesConstants';

export const $$initialState = Immutable.fromJS({
  $$categories: [],
  fetchCategoryError: null,
  submitCategoryError: null,
  isFetchingCategories: false,
  isSavingCategories: false,
});

export default function categoriesReducer($$state = $$initialState, action = null) {
  const { type, category, categories, error } = action;

  switch (type) {
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      return $$state.merge({
        $$categories: categories,
        fetchCategoryError: null,
        isFetchingCategories: false,
      });
    }

    case actionTypes.FETCH_CATEGORIES_FAILURE: {
      return $$state.merge({
        fetchCategoryError: error,
        isFetchingCategories: false,
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
            isSavingCategories: false,
          })
      ));
    }

    case actionTypes.SUBMIT_CATEGORY_FAILURE: {
      return $$state.merge({
        submitCategoryError: error,
        isSavingCategories: false,
      });
    }

    case actionTypes.SET_IS_FETCHING_CATEGORIES: {
      return $$state.merge({
        isFetchingCategories: true,
      });
    }

    case actionTypes.SET_IS_SAVING_CATEGORY: {
      return $$state.merge({
        isSavingCategories: true,
      });
    }

    default: {
      return $$state;
    }
  }
}
