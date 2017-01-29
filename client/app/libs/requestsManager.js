import jQuery from 'jquery';

const API_URL = '/api/';

export default {

  fetchCategories() {
    return this.get('categories');
  },

  createCategory(category) {
    return this.post('categories', { category });
  },

  get(path, data) {
    return jQuery.get(this.makePath(path), data);
  },

  post(path, data) {
    return jQuery.post(this.makePath(path), data);
  },

  makePath(path) {
    return `${API_URL}${path}`;
  },

};
