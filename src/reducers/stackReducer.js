import { GET_STACKS, GET_STACK } from '../actions/types';

const initialState = {
  items: [],
  item: {},
}

const stackReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STACKS:
      return {
        ...state,
        items: action.payload,
      };
    case GET_STACK:
      return {
        ...state,
        item: action.payload,
      };    
    default:
      return state;
  }
};

export default stackReducer;