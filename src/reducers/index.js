import { combineReducers } from 'redux';
import { LOGOUT } from '../actions/types';
import userReducer from './userReducer';
import favoritesReducer from './favoritesReducer';
import stacksReducer from './stacksReducer';
import stackReducer from './stackReducer';
import errorsReducer from './errorReducer';

const rootReducer = combineReducers({
  user: userReducer,
  stacks: stacksReducer,
  stack: stackReducer,
  favorites: favoritesReducer,
  error: errorsReducer,
});

export default (state, action) => 
  rootReducer(action.type === LOGOUT ? undefined : state,action);