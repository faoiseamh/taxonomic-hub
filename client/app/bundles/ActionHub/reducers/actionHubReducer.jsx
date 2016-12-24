import { combineReducers } from 'redux';
import { ACTION_HUB_CATEGORIES_UPDATE } from '../constants/actionHubConstants';

const categories = (state = '', action) => {
  switch (action.type) {
    case ACTION_HUB_CATEGORIES_UPDATE:
      return action.categories;
    default:
      return state;
  }
};

const actionHubReducer = combineReducers({ categories: categories });

export default actionHubReducer;
