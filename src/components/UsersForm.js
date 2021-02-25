import React, { useState} from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions';

const UsersForm = props => {

  const initState = {
    username: '',
    password: '',
  }

  const [state, setState] = useState(initState);

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {    
    e.preventDefault();

    const user = {
      username: state.username,
      password: state.password,
    };

    props.createUser(user);
    setState(initState);    
    e.target.reset();
  };

  return (
    <div>
      <p>StackForm</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="name" onChange={onChange} />
        <input type="password" name="password" onChange={onChange} />
        <button type="submit">Create User</button>
      </form>
    </div>
  )
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersForm);
