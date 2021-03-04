import { GET_STACKS, GET_STACK, CREATE_STACK, DELETE_STACK, ADD_LINK, DELETE_LINK, FAVE_STACK } from '../actions/types';

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
    case CREATE_STACK:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_STACK:
      return {
        ...state,
        items: state.items.filter(stack => stack.id !== action.payload),
      };
    case ADD_LINK:
      return {
        ...state,
        item: {
          ...state.item,
          links: [...state.item.links, action.payload],
        },
      };
    case DELETE_LINK:
      return {
        ...state,
        item: {
          ...state.item,
          links: state.item.links.filter(link => link.id !== action.payload),
        },
      };
    case FAVE_STACK:
      return state;
    default:
      return state;
  }
};

export default stackReducer;