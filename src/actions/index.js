import axios from 'axios';
import { SET_USER, GET_STACKS, GET_STACK } from './types';

// will need to pass username, password in future
const USERS_API = 'http://localhost:3000/api/v1/users';
const STACKS_API = 'http://localhost:3000/api/v1/stacks';
const AUTH_API = 'http://localhost:3000/api/v1/authenticate';

export const createUser = user => dispatch => axios({
  method: 'post',
  url: USERS_API,
  data: {
    user: user,
  },
}).then(response => {    
  const token = response.data.data;
  
  dispatch({ type: SET_USER, payload: { username: user.username, token }});
}).catch(error => console.log(error));

export const loginUser = user => dispatch => axios({
  method: 'post',
  url: AUTH_API,
  data: user,
}).then(response => {   
  const token = response.data.token;    
  console.log(token);
  dispatch({ type: SET_USER, payload: { username: user.username, token }});
}).catch(error => console.log(error));

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
  console.log(response);
}).catch(error => console.log(error));

export const getStacks = () => dispatch => axios({
  method: 'get',
  url: STACKS_API,
}).then(response => {
  console.log(response.data);
  const stacks = response.data;
  dispatch({
    type: GET_STACKS,
    payload: stacks,
  });
}).catch(error => console.log(error));

export const getStack = id => dispatch => axios({
  method: 'get',
  url: `${STACKS_API}/${id}`,
}).then(response => {
  console.log(response.data);
  const stack = response.data;
  dispatch({
    type: GET_STACK,
    payload: stack,
  });
}).catch(error => console.log(error));







// export const getStacks = () => dispatch => axios({
//   method: 'get',
//   url: STACKS_API,
// }).then(response => {
//   console.log('stack', response.data);
//   const stacks = response.data;
//   dispatch({ type: GET_STACKS, payload: stacks });
// }).catch(error => console.log(error));
