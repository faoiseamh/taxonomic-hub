/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/usersConstants';

export const $$initialState = Immutable.fromJS({
  $$currentUser: false,
  isAuthenticated: false,
  isSigningUp: false,
  signUpError: null,
  isSigningIn: false,
  signInError: null,
  isSigningOut: false,
  signOutError: null,
  resetPasswordError: null,
  isSendingResetPasswordEmail: false,
});

export default function usersReducer($$state = $$initialState, action = null) {
  const { type, user, error } = action;

  switch (type) {

    // Sign Up
    case actionTypes.SIGN_UP_SUCCESS: {
      return $$state.merge({
        $$currentUser: user,
        isAuthenticated: true,
        signUpError: null,
        isSigningUp: false,
      });
    }

    case actionTypes.SIGN_UP_FAILURE: {
      return $$state.merge({
        signUpError: error,
        isSigningUp: false,
      });
    }

    case actionTypes.CLEAR_SIGN_UP_FAILURE: {
      return $$state.merge({
        signUpError: null,
      });
    }

    // Sign In
    case actionTypes.SIGN_IN_SUCCESS: {
      return $$state.merge({
        $$currentUser: user,
        isAuthenticated: true,
        signInError: null,
        isSigningIn: false,
      });
    }

    case actionTypes.SIGN_IN_FAILURE: {
      return $$state.merge({
        signInError: error,
        isSigningIn: false,
      });
    }

    case actionTypes.CLEAR_SIGN_IN_FAILURE: {
      return $$state.merge({
        signInError: null,
      });
    }

    // Sign Out
    case actionTypes.SIGN_OUT_SUCCESS: {
      return $$state.merge({
        $$currentUser: false,
        isAuthenticated: false,
        signOutError: null,
        isSigningOut: false,
      });
    }

    case actionTypes.SIGN_OUT_FAILURE: {
      return $$state.merge({
        signOutError: error,
        isSigningOut: false,
      });
    }

    case actionTypes.CLEAR_SIGN_OUT_FAILURE: {
      return $$state.merge({
        signOutError: null,
      });
    }

    // Reset Password
    case actionTypes.RESET_PASSWORD_SUCCESS: {
      return $$state.merge({
        resetPasswordError: null,
        isSendingResetPasswordEmail: false,
        resetEmailSent: true,
      });
    }

    case actionTypes.SET_IS_SENDING_RESET_EMAIL: {
      return $$state.merge({
        isSendingResetPasswordEmail: true,
      });
    }

    case actionTypes.RESET_PASSWORD_FAILURE: {
      return $$state.merge({
        resetPasswordError: error,
        isSendingResetPasswordEmail: false,
        resetEmailSent: false,
      });
    }

    case actionTypes.CLEAR_RESET_PASSWORD_FAILURE: {
      return $$state.merge({
        resetPasswordError: null,
      });
    }

    case actionTypes.CLEAR_RESET_PASSWORD_EMAIL_SENT: {
      return $$state.merge({
        resetEmailSent: false,
      });
    }


    default: {
      return $$state;
    }
  }
}
