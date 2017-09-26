import * as actionTypes from '../constants/pageConstants';

// Editable
export function setPageIsEditable() {
  return {
    type: actionTypes.SET_PAGE_IS_EDITABLE,
  };
}

export function setPageNotEditable() {
  return {
    type: actionTypes.SET_PAGE_NOT_EDITABLE,
  };
}

// Editing
export function setEditMode() {
  return {
    type: actionTypes.SET_EDIT_MODE,
  };
}

export function editSuccess() {
  return {
    type: actionTypes.EDIT_SUCCESS,
  };
}
