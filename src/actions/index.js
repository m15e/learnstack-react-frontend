import axios from 'axios';
import { SET_USER, GET_STACKS, GET_STACK } from './types';

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
  const stacks = response.data; // refactor when code is complete
  dispatch({
    type: GET_STACKS,
    payload: stacks,
  });
}).catch(error => console.log(error));

export const getStack = data => dispatch => axios({
  method: 'get',
  url: `${STACKS_API}/${data['id']}`,
  // headers: {
  //       'authorization': `bearer: ${data['token']}`,
  //       'Content-Type': 'application/json'
  // },
}).then(response => {
  console.log(response.data);
  const stack = response.data;
  dispatch({
    type: GET_STACK,
    payload: stack,
  });
}).catch(error => console.log(error));

export const createLink = data => axios({
  method: 'post',
  url: LINKS_API,
  headers: {
        'authorization': data['auth'],
        'Content-Type': 'application/json'
  },
  data: {
    link: data['link'],
  },
}).then(response => {
  console.log(response.data);
}).catch(error => console.log(error));

export const logoutUser = dispatch => ({
  type: SET_USER, payload: null,
});






// export const getStacks = () => dispatch => axios({
//   method: 'get',
//   url: STACKS_API,
// }).then(response => {
//   console.log('stack', response.data);
//   const stacks = response.data;
//   dispatch({ type: GET_STACKS, payload: stacks });
// }).catch(error => console.log(error));
