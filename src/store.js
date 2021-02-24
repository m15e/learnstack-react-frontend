import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import rootReducer from './reducers';
import userReducer from './reducers/userReducer';

const initialState = {
  user: {
    user_id: 1,
    token: 'abc'
  },
  stacks: [],
};

const middleware = [thunk];

const store = createStore(
  //rootReducer,
  userReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // remove before submitting
  ),  
);

export default store;
