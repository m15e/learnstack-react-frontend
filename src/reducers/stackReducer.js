import { GET_STACKS } from '../actions/types';

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
    default:
      return state;
  }
};

export default stackReducer;