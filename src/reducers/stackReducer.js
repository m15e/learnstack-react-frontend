import {
  GET_STACK, ADD_LINK, DELETE_LINK,
} from '../actions/types';

const initialState = {};

const stackReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STACK:
      return action.payload;
    case ADD_LINK:
      return {
        ...state,
        links: [...state.links, action.payload],
      };
    case DELETE_LINK:
      return {
        ...state,
        links: state.links.filter(link => link.id !== action.payload),
      };
    default:
      return state;
  }
};

export default stackReducer;
