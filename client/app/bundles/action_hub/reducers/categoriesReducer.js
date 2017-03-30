/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/categoriesConstants';


export function getCategories($$state) {
  return $$state.get('$$categories').valueSeq();
}

export function getCategory($$state, categoryId) {
  return $$state.get('$$categories').get(String(categoryId));
}

export const $$initialState = Immutable.fromJS({
  $$categories: {},
  fetchCategoriesError: null,
  submitCategoryError: null,
  isFetchingCategories: false,
  isSavingCategories: false,
  isDeletingCategory: false,
  deleteCategoryError: null,
});

export default function categoriesReducer($$state = $$initialState, action = null) {
  const { type, category, categories, error } = action;

  switch (type) {
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      return $$state.merge({
        $$categories: categories,
        fetchCategoriesError: null,
        isFetchingCategories: false,
      });
    }

    case actionTypes.FETCH_CATEGORIES_FAILURE: {
      return $$state.merge({
        fetchCategoriesError: error,
        isFetchingCategories: false,
      });
    }

    case actionTypes.SUBMIT_CATEGORY_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$categories'],
            $$categories => Immutable.fromJS({
              ...$$categories.toJS(),
              [category.id]: category,
            }),
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

    // Delete
    case actionTypes.SET_IS_DELETING_CATEGORY: {
      return $$state.merge({
        isDeletingCategory: true,
      });
    }

    case actionTypes.DELETE_CATEGORY_FAILURE: {
      return $$state.merge({
        deleteCategoryError: error,
        isDeletingCategory: false,
      });
    }

    case actionTypes.CLEAR_DELETE_CATEGORY_FAILURE: {
      return $$state.merge({
        deleteCategoryError: null,
      });
    }

    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$categories'],
            $$categories => $$categories.filter(($$category) => $$category.get('id') !== category.id),
          )
          .merge({
            deleteCategoryError: null,
            isDeletingCategory: false,
          })
      ));
    }

    default: {
      return $$state;
    }
  }
}
