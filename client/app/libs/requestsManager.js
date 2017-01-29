import jQuery from 'jquery';

const API_URL = '/api/';

export default {

  // Category requests
  fetchCategories() {
    return this.get('categories');
  },

  createCategory(category) {
    return this.post('categories', { category });
  },

  // Topic requests
  fetchTopic(topicId) {
    return this.get(`topics/${topicId}`);
  },

  fetchTopics() {
    return this.get('topics');
  },

  createTopic(topic) {
    return this.post('topics', { topic });
  },


  // Helpers

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
