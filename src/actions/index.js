import axios from 'axios';
import { SET_USER, GET_STACKS, GET_STACK, CREATE_STACK, ADD_LINK, DELETE_STACK, DELETE_LINK } from './types';

// will need to pass username, password in future
const USERS_API = 'http://localhost:3000/api/v1/users';
const STACKS_API = 'http://localhost:3000/api/v1/stacks';
const LINKS_API = 'http://localhost:3000/api/v1/links';
const AUTH_API = 'http://localhost:3000/api/v1/authenticate';

export const createUser = user => dispatch => axios({
  method: 'post',
  url: USERS_API,
  data: {
    user: user,
  },
}).then(response => {
  const data = response.data.data;
  const token = data.token;
  const id = data.id;  
  const userData = { username: user.username, token: token, id: id };

  dispatch({ type: SET_USER, payload: userData });
  localStorage.setItem('user', JSON.stringify(userData));

}).catch(error => console.log(error));

export const loginUser = user => dispatch => axios({
  method: 'post',
  url: AUTH_API,
  data: user,
}).then(response => {   
  const data = response.data;
  const token = data.token;
  const id = data.id;    
  const userData = { username: user.username, token: token, id: id, };  
  dispatch({ type: SET_USER, payload: userData });
  localStorage.setItem('user', JSON.stringify(userData)); 
}).catch(error => console.log(error));

export const setUser = user => dispatch => {
  const userData = JSON.parse(user)
  dispatch({ type: SET_USER, payload: userData });
};

export const logoutUser = dispatch => ({
  type: SET_USER, payload: null,
});

export const createStack = data => dispatch => axios({
  method: 'post',
  url: STACKS_API,
  headers: {
        'authorization': data['auth'],
        'Content-Type': 'application/json'
  },
  data: {
    stack: data['stack'],
  },
}).then(response => {     
  dispatch({ type: CREATE_STACK, payload: response.data });
}).catch(error => console.log(error));

export const deleteStack = data => dispatch => axios({
  method: 'delete',
  url: `${STACKS_API}/${data['id']}`,
  headers: {
        'authorization': data['auth'],
        'Content-Type': 'application/json'
  },
}).then(() => {
  dispatch({
    type: DELETE_STACK,
    payload: data['id'],
  });
}).catch(error => console.log(error));

export const getStacks = () => dispatch => axios({
  method: 'get',
  url: STACKS_API,
}).then(response => {    
  dispatch({
    type: GET_STACKS,
    payload: response.data,
  });
}).catch(error => console.log(error));

export const getStack = data => dispatch => axios({
  method: 'get',
  url: `${STACKS_API}/${data}`,
}).then(response => {  
  const stack = response.data;
  dispatch({
    type: GET_STACK,
    payload: stack,
  });
}).catch(error => console.log(error));

export const createLink = data => dispatch => axios({
    method: 'post',
    url: 'http://localhost:3000/api/v1/links',
    headers: {
          'authorization': data['auth'],
          'Content-Type': 'application/json'
    },
    data: {
      link: data['link'],
    },
  }).then(response => {
    console.log(response.data);
    dispatch({
      type: ADD_LINK,
      payload: response.data,
    });
  }).catch(error => console.log(error)); 

export const deleteLink = data => dispatch => axios({
  method: 'delete',
  url: `${LINKS_API}/${data['id']}`,
  headers: {
        'authorization': data['auth'],
        'Content-Type': 'application/json'
  },
}).then(() => {
  dispatch({
    type: DELETE_LINK,
    payload: data['id'],
  });
}).catch(error => console.log(error));

