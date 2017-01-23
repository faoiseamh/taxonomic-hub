import * as actionTypes from '../constants/categoriesConstants';

export function setIsFetching() {
  return {
    type: actionTypes.SET_IS_FETCHING,
  };
}

export function setIsSaving() {
  return {
    type: actionTypes.SET_IS_SAVING,
  };
}

export function fetchCategoriesSuccess(data) {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    categories: data.categories,
  };
}

export function fetchCategoriesFailure(error) {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILURE,
    error,
  };
}

export function submitCategorySuccess(category) {
  return {
    type: actionTypes.SUBMIT_CATEGORY_SUCCESS,
    category,
  };
}

export function submitCategoryFailure(error) {
  return {
    type: actionTypes.SUBMIT_CATEGORY_FAILURE,
    error,
  };
}

export function fetchCategories() {
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      $.get('/categories')
        .done(res => dispatch(fetchCategoriesSuccess(res)))
        .fail(error => dispatch(fetchCategoriesFailure(error)))
    );
  };
}

export function submitCategory(category) {
  return (dispatch) => {
    dispatch(setIsSaving());
    return (
      $.post('/categories', { category: category })
        .done(res => dispatch(submitCategorySuccess(res)))
        .fail(error => dispatch(submitCategoryFailure(error)))
    );
  };
}
