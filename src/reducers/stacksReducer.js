import { GET_STACKS, CREATE_STACK, DELETE_STACK } from '../actions/types';

const initialState = [];

const stacksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STACKS:
      return action.payload;
    case CREATE_STACK:
      return [...state, action.payload];
    case DELETE_STACK:
      return state.filter(stack => stack.id !== action.payload);
    default:
      return state;
  }
};

export default stacksReducer;
