import { SET_USER, CLEAR_USER, FAVE_STACK, UNFAVE_STACK } from '../actions/types';

const initialState = {  
  username: '',
  token: '',
  id: '',
  favorites: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case CLEAR_USER:
      return initialState;    
    default:
      return state;
  }
};

export default userReducer; 