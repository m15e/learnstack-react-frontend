import { WRONG_CREDS } from '../actions/types';

const initialState = '';

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case WRONG_CREDS: 
      return action.payload;    
    default:
      return state;
  }
};

export default errorReducer;