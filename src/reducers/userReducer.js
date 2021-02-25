import { SET_USER } from '../actions/types';

const initialState = {  
  username: '',
  token: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;