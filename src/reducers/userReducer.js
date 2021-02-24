import { CREATE_USER } from '../actions/types';

const initialState = {
  user_id: null,
  token: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        payload: action.payload, // user_id in future
      };
    default:
      return state;
  }
};

export default userReducer;