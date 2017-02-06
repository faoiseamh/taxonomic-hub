/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/usersConstants';

export const $$initialState = Immutable.fromJS({
  $$currentUser: false,
  isSigningUp: false,
  signUpError: null,
  isSigningIn: false,
  signInError: null,
  isSigningOut: false,
  signOutError: null,
});

export default function usersReducer($$state = $$initialState, action = null) {
  const { type, user, error } = action;

  switch (type) {

    // Sign Up
    case actionTypes.SIGN_UP_SUCCESS: {
      return $$state.merge({
        $$currentUser: user,
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

    default: {
      return $$state;
    }
  }
}
