import { FAVE_STACK, SET_FAVORITES, UNFAVE_STACK } from '../actions/types';

const initialState = [];

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return action.payload;
    case FAVE_STACK:
      return [...state, action.payload];
    case UNFAVE_STACK:
      return state.filter(f => f.stack_id !== action.payload);  
    //return state.filter(fav => fav.stack_id !== action.payload);
    default:
      return state;
  }
};

export default favoritesReducer;
