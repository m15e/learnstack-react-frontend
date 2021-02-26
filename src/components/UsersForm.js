import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUser, loginUser } from '../actions';

const UsersForm = props => {

  const [state, setState] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onCheck = e => {
    setIsSignUp(e.target.checked);    
  };

  const handleSubmit = e => {    
    e.preventDefault();

    console.log(isSignUp);
    
    const user = {
      username: state.username,
      password: state.password,
    };

    if (isSignUp) {
      props.createUser(user);
    } else {
      props.loginUser(user);
    }
    
    e.target.reset();
  };

  return (
    <>      
      <h3>User form:</h3>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" name="signup" onChange={onCheck} />
        <input type="text" name="username" placeholder="name" onChange={onChange} />
        <input type="password" name="password" onChange={onChange} />
        <button type="submit">Send</button>
      </form>
    </>
  )
};

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),
  loginUser: user => dispatch(loginUser(user)),
});

export default connect(null, mapDispatchToProps)(UsersForm);
