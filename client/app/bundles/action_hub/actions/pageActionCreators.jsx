import * as actionTypes from '../constants/pageConstants';

// Sign Up
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
