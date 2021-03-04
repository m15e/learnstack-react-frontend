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
    case FAVE_STACK:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case UNFAVE_STACK:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;