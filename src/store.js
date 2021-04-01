import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {
  user: {
    username: '',
    token: '',
    id: '',
  },
  favorites: [],
  stacks: [],
  stack: {},
};

const middleware = [thunk];

/* eslint-disable */


const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__(), 
    ),
);
/* eslint-enable */

export default store;
