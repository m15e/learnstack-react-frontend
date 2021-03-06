import { TOAST_MESSAGE, WRONG_CREDS } from '../actions/types';

const initialState = '';

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case WRONG_CREDS:
      return action.payload;
    case TOAST_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export default messageReducer;
