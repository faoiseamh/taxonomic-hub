import { push } from 'react-router-redux';
import requestsManager from 'libs/requestsManager'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/usersConstants';
import * as paths from '../constants/paths';

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

export function clearSignUpFailure() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_SIGN_UP_FAILURE,
    });
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

export function signIn(user, redirect = paths.ROOT_PATH) {
  return (dispatch) => {
    dispatch(setIsSigningIn());
    return (
      requestsManager.signIn(user)
        .done(res => {
          dispatch(signInSuccess(res));
          dispatch(push(redirect));
        })
        .fail(error => dispatch(signInFailure(error)))
    );
  };
}

export function clearSignInFailure() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_SIGN_IN_FAILURE,
    });
  };
}


// Sign out
export function setIsSigningOut() {
  return {
    type: actionTypes.SET_IS_SIGNING_OUT,
  };
}

export function signOutSuccess(user) {
  return {
    type: actionTypes.SIGN_OUT_SUCCESS,
    user,
  };
}

export function signOutFailure(error) {
  return {
    type: actionTypes.SIGN_OUT_FAILURE,
    error,
  };
}

export function signOut() {
  return (dispatch) => {
    dispatch(setIsSigningOut());
    return (
      requestsManager.signOut()
        .done(res => {
          dispatch(signOutSuccess(res));
          dispatch(push(paths.AFTER_SIGN_OUT_PATH));
        })
        .fail(error => dispatch(signOutFailure(error)))
    );
  };
}

export function clearSignOutFailure() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_SIGN_OUT_FAILURE,
    });
  };
}

// Reset Password
export function setIsResettingPassword() {
  return {
    type: actionTypes.SET_IS_RESETTING_PASSWORD,
  };
}

export function resetPasswordSuccess(user) {
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
    user,
  };
}

export function resetPasswordFailure(error) {
  return {
    type: actionTypes.RESET_PASSWORD_FAILURE,
    error,
  };
}

export function resetPassword(user) {
  return (dispatch) => {
    dispatch(setIsResettingPassword());
    return (
      requestsManager.resetPassword(user)
        .done(res => {
          dispatch(resetPasswordSuccess(res));
        })
        .fail(error => dispatch(resetPasswordFailure(error)))
    );
  };
}

export function clearResetPasswordFailure() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_RESET_PASSWORD_FAILURE,
    });
  };
}

export function clearResetPasswordEmailSent() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_RESET_PASSWORD_EMAIL_SENT,
    });
  };
}
