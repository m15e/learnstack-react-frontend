import axios from 'axios';
import { CREATE_USER } from './types';

// will need to pass username, password in future
const USER_API = 'http://localhost:3000/api/v1/users';

export const createUser = () => dispatch => axios({
  method: 'post',
  url: USER_API,
  data: {
    user: {
      username: 'react',
      password: 'reactpw',
    }
  }
}).then(response => {
  console.log(response);
}).catch(error => console.log(error));
