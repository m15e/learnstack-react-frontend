import axios from 'axios';
import {
  SET_USER,
  GET_STACKS,
  GET_STACK,
  CREATE_STACK,
  ADD_LINK,
  SET_FAVORITES,
  FAVE_STACK,
  UNFAVE_STACK,
  DELETE_STACK,
  DELETE_LINK,
  LOGOUT,
  WRONG_CREDS,
  TOAST_MESSAGE,
} from './types';

const USERS_API = 'https://learnstack-api.herokuapp.com/api/v1/users';
const STACKS_API = 'https://learnstack-api.herokuapp.com/api/v1/stacks';
const LINKS_API = 'https://learnstack-api.herokuapp.com/api/v1/links';
const AUTH_API = 'https://learnstack-api.herokuapp.com/api/v1/authenticate';
const FAVES_API = 'https://learnstack-api.herokuapp.com/api/v1/favorites';

export const createUser = user => dispatch => axios({
  method: 'post',
  url: USERS_API,
  data: {
    user,
  },
}).then(response => {
  const { data } = response.data;
  const { token } = data;
  const { id } = data;
  const userData = { username: user.username, token, id };

  dispatch({ type: SET_USER, payload: userData });
  localStorage.setItem('user', JSON.stringify(userData));
}).catch(() => dispatch({ type: WRONG_CREDS, payload: 'Error username already exists or invalid' }));

export const loginUser = user => dispatch => axios({
  method: 'post',
  url: AUTH_API,
  data: user,
}).then(response => {
  const { data } = response;
  const { token } = data;
  const { id } = data;
  const userData = {
    username: user.username, token, id,
  };

  dispatch({ type: SET_USER, payload: userData });
  localStorage.setItem('user', JSON.stringify(userData));
}).catch(() => dispatch({ type: WRONG_CREDS, payload: 'Invalid username or password' }));

export const setUser = user => dispatch => {
  const userData = JSON.parse(user);
  dispatch({ type: SET_USER, payload: userData });
};

export const toastMessage = message => dispatch => {
  dispatch({ type: TOAST_MESSAGE, payload: message });
};

export const clearStore = () => ({
  type: LOGOUT, payload: null,
});

export const createStack = data => dispatch => axios({
  method: 'post',
  url: STACKS_API,
  headers: {
    authorization: data.auth,
    'Content-Type': 'application/json',
  },
  data: {
    stack: data.stack,
  },
}).then(response => {
  dispatch({ type: CREATE_STACK, payload: response.data });
}).catch(error => dispatch({ type: TOAST_MESSAGE, payload: error }));

export const deleteStack = data => dispatch => axios({
  method: 'delete',
  url: `${STACKS_API}/${data.id}`,
  headers: {
    authorization: data.auth,
    'Content-Type': 'application/json',
  },
}).then(() => {
  dispatch({
    type: DELETE_STACK,
    payload: data.id,
  });
}).catch(error => dispatch({ type: TOAST_MESSAGE, payload: error }));

export const getStacks = () => dispatch => axios({
  method: 'get',
  url: STACKS_API,
}).then(response => {
  dispatch({
    type: GET_STACKS,
    payload: response.data,
  });
}).catch(error => dispatch({ type: TOAST_MESSAGE, payload: error }));

export const getStack = data => dispatch => axios({
  method: 'get',
  url: `${STACKS_API}/${data}`,
}).then(response => {
  const stack = response.data;
  dispatch({
    type: GET_STACK,
    payload: stack,
  });
}).catch(error => dispatch({ type: TOAST_MESSAGE, payload: error }));

export const getFavorites = id => dispatch => axios({
  method: 'get',
  url: `${FAVES_API}?user_id=${id}`,
}).then(response => {
  const { data } = response;
  dispatch({ type: SET_FAVORITES, payload: data });
});

export const favoriteStack = data => dispatch => axios({
  method: 'post',
  url: FAVES_API,
  headers: {
    authorization: data.auth,
    'Content-Type': 'application/json',
  },
  data: {
    favorite: {
      stack_id: data.id,
    },
  },
}).then(response => {
  const { data } = response;
  dispatch({
    type: FAVE_STACK,
    payload: data,
  });
}).catch(error => dispatch({ type: TOAST_MESSAGE, payload: error }));

export const unFavoriteStack = data => dispatch => axios({
  method: 'delete',
  url: `${FAVES_API}/${data.id}`,
  headers: {
    authorization: data.auth,
    'Content-Type': 'application/json',
  },
}).then(() => {
  dispatch({
    type: UNFAVE_STACK,
    payload: data.id,
  });
}).catch(error => dispatch({ type: TOAST_MESSAGE, payload: error }));

export const createLink = data => dispatch => axios({
  method: 'post',
  url: LINKS_API,
  headers: {
    authorization: data.auth,
    'Content-Type': 'application/json',
  },
  data: {
    link: data.link,
  },
}).then(response => {
  dispatch({
    type: ADD_LINK,
    payload: response.data,
  });
}).catch(error => dispatch({ type: TOAST_MESSAGE, payload: error }));

export const deleteLink = data => dispatch => axios({
  method: 'delete',
  url: `${LINKS_API}/${data.id}`,
  headers: {
    authorization: data.auth,
    'Content-Type': 'application/json',
  },
}).then(() => {
  dispatch({
    type: DELETE_LINK,
    payload: data.id,
  });
}).catch(error => dispatch({ type: TOAST_MESSAGE, payload: error }));
