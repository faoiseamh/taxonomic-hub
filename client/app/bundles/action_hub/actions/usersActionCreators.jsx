import requestsManager from 'libs/requestsManager'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/usersConstants';

// Sign Up
export function setIsSigningUp() {
  return {
    type: actionTypes.SET_IS_SIGNING_UP,
  };
}

export function signUpSuccess(user) {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    user,
  };
}

export function signUpFailure(error) {
  return {
    type: actionTypes.SIGN_UP_FAILURE,
    error,
  };
}

export function signUp(user) {
  return (dispatch) => {
    dispatch(setIsSigningUp());
    return (
      requestsManager.signUp(user)
        .done(res => dispatch(signUpSuccess(res)))
        .fail(error => dispatch(signUpFailure(error)))
    );
  };
}

// Sign In
export function setIsSigningIn() {
  return {
    type: actionTypes.SET_IS_SIGNING_IN,
  };
}

export function signInSuccess(user) {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    user,
  };
}

export function signInFailure(error) {
  return {
    type: actionTypes.SIGN_IN_FAILURE,
    error,
  };
}

export function signIn(user) {
  return (dispatch) => {
    dispatch(setIsSigningIn());
    return (
      requestsManager.signIn(user)
        .done(res => dispatch(signInSuccess(res)))
        .fail(error => dispatch(signInFailure(error)))
    );
  };
}
