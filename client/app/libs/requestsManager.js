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

  updateCategory(category) {
    const categoryId = category.id;
    const categoryWithoutId = category;
    delete categoryWithoutId.id;
    return this.put(`categories/${categoryId}`, { category: categoryWithoutId });
  },

  deleteCategory(category) {
    return this.delete(`categories/${category.id}`);
  },


  // Event requests
  fetchEvent(eventId) {
    return this.get(`events/${eventId}`);
  },

  fetchEvents() {
    return this.get('events');
  },

  createEvent(event) {
    return this.post('events', { event });
  },

  updateEvent(event) {
    const eventId = event.id;
    const eventWithoutId = event;
    delete eventWithoutId.id;
    return this.put(`events/${eventId}`, { event: eventWithoutId });
  },

  deleteEvent(event) {
    return this.delete(`events/${event.id}`);
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

  deleteTopic(topic) {
    return this.delete(`topics/${topic.id}`);
  },

  // EventFavorites requests

  createEventFavorite(eventId) {
    return this.post('event_favorites', { eventId });
  },

  deleteEventFavorite(event) {
    return this.delete(`event_favorites/${event.id}`);
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
  resetPassword(user) {
    return this.post('../users/password', { user });
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
