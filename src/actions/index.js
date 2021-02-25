import axios from 'axios';
import { SET_USER } from './types';

// will need to pass username, password in future
const USER_API = 'http://localhost:3000/api/v1/users';

export const createUser = user => dispatch => axios({
  method: 'post',
  url: USER_API,
  data: {
    user: user,
  },
}).then(response => {  
  response = response.data;
  const token = response.data;
  
  dispatch({ type: SET_USER, payload: { username: user.username, token: token }});
}).catch(error => console.log(error));
