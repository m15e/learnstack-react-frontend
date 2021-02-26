import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {
  user: {
    username: '',
    token: '',
  },
  stacks: {
    items: [],
    item: {},
  }  
};

const middleware = [thunk];

const store = createStore(
  rootReducer,  
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // remove before submitting
  ),  
);

export default store;
