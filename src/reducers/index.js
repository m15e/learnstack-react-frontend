import { combineReducers } from 'redux';
import userReducer from './userReducer';
import favoritesReducer from './favoritesReducer';
import stacksReducer from './stacksReducer';
import stackReducer from './stackReducer';

export default combineReducers({
  user: userReducer,
  stacks: stacksReducer,
  stack: stackReducer,
  favorites: favoritesReducer,
});
