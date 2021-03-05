import { combineReducers } from 'redux';
import userReducer from './userReducer';
import stackReducer from './stackReducer';
import favoritesReducer from './favoritesReducer';


export default combineReducers({
  user: userReducer,
  stacks: stackReducer,
  favorites: favoritesReducer,
});
