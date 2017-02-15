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

  updateTopic(topic) {
    const topicId = topic.id;
    const topicWithoutId = topic;
    delete topicWithoutId.id;
    return this.put(`topics/${topicId}`, { topic: topicWithoutId });
  },

  // Users requests
  signUp(user) {
    return this.post('../users', { user });
  },
  signIn(user) {
    return this.post('../users/sign_in', { user });
  },
  signOut(user) {
    return this.delete('../users/sign_out', { user });
  },


  // Helpers

  get(path, data) {
    return jQuery.ajax(this.makePath(path), {
      method: 'GET',
      dataType: 'json',
      data,
    });
  },

  post(path, data) {
    return jQuery.ajax(this.makePath(path), {
      method: 'POST',
      dataType: 'json',
      data,
    });
  },

  put(path, data) {
    return jQuery.ajax(this.makePath(path), {
      method: 'PUT',
      dataType: 'json',
      data,
    });
  },

  delete(path, data) {
    return jQuery.ajax(this.makePath(path), {
      method: 'DELETE',
      dataType: 'json',
      data,
    });
  },

  makePath(path) {
    return `${API_URL}${path}`;
  },

};
