import { createStore } from 'redux';
import actionHubReducer from '../reducers/actionHubReducer';

const configureStore = (railsProps) => (
  createStore(actionHubReducer, railsProps)
);

export default configureStore;
