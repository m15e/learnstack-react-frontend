import axios from 'axios';
import { SET_USER } from './types';

// will need to pass username, password in future
const USER_API = 'http://localhost:3000/api/v1/users';
const AUTH_API = 'http://localhost:3000/api/v1/authenticate';

export const createUser = user => dispatch => axios({
  method: 'post',
  url: USER_API,
  data: {
    user: user,
  },
}).then(response => {    
  const token = response.data.data;
  
  dispatch({ type: SET_USER, payload: { username: user.username, token: token }});
}).catch(error => console.log(error));

export const loginUser = user => dispatch => axios({
  method: 'post',
  url: AUTH_API,
  data: user,
}).then(response => {   
  const token = response.data.token;    
  dispatch({ type: SET_USER, payload: { username: user.username, token }});
}).catch(error => console.log(error));
