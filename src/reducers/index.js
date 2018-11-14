import { combineReducers } from 'redux';
import currentUser from './currentUser.js';
import user from './user.js';

export default combineReducers({
  currentUser,
  user
});