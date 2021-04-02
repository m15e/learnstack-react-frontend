import { combineReducers } from 'redux';
import { LOGOUT } from '../actions/types';
import userReducer from './userReducer';
import favoritesReducer from './favoritesReducer';
import stacksReducer from './stacksReducer';
import stackReducer from './stackReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  user: userReducer,
  stacks: stacksReducer,
  stack: stackReducer,
  favorites: favoritesReducer,
  message: messageReducer,
});

export default (state, action) => 
  rootReducer(action.type === LOGOUT ? undefined : state,action);