import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUser, loginUser } from '../actions';

const UsersForm = props => {
  const { createUser, loginUser } = props;

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
      createUser(user);
    } else {
      loginUser(user);
    }
    
    e.target.reset();
  };

  return (
    <div className="users-form">      
      <h3 className="title is-3">User form:</h3>
      <form onSubmit={handleSubmit}>
          <input type="checkbox" name="signup" onChange={onCheck} />
          <div className="field">
            <label className="label">Username:</label>
            <div className="control">
              <input className="input" type="text" name="username" placeholder="Enter Username" onChange={onChange} />
            </div>
          </div>
          <div className="field">
            <label className="label">Password:</label>
            <div className="control">
              <input className="input" type="password" name="password" placeholder="Enter Password" onChange={onChange} />              
            </div>
          </div>
        <button className="button" type="submit">Send</button>
      </form>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),
  loginUser: user => dispatch(loginUser(user)),
});

export default connect(null, mapDispatchToProps)(UsersForm);
