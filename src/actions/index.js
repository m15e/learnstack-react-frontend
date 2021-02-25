import axios from 'axios';
import { SET_USER } from './types';

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

export const createStack = stack => dispatch => axios({
  method: 'post',
  url: STACKS_API,
  headers: {
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMH0.WcGWtJO_NpmbUw_ZXZ1rHUVlTSYTM3-Qb7h4oj3unHI',
        'Content-Type': 'application/json'
  }, //{"Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMH0.WcGWtJO_NpmbUw_ZXZ1rHUVlTSYTM3-Qb7h4oj3unHI"},
  data: {
    stack: stack,
  },
}).then(response => {   
  console.log(response);
}).catch(error => console.log(error));
