/* eslint-disable import/prefer-default-export */

import { ACTION_HUB_CATEGORIES_UPDATE } from '../constants/actionHubConstants';

export const updateCategories = (categories) => ({
  type: ACTION_HUB_CATEGORIES_UPDATE,
  categories,
});
