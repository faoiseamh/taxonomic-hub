import requestsManager from 'libs/requestsManager'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import * as actionTypes from '../constants/usersConstants';

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
