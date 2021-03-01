import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createUser, loginUser } from '../actions';

const UsersForm = props => {
  const { createUser, loginUser } = props;

  const [state, setState] = useState({});
  const newUser = document.querySelector('#newUser');//.value;  

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = e => {    
    e.preventDefault();

    console.log(newUser.checked);
    
    const user = {
      username: state.username,
      password: state.password,      
    };

    if (newUser.checked) {      
      createUser(user);
    } else {
      loginUser(user);
    }
    
    e.target.reset();
  };

  return (
    <div className="users-form">      
      <p className="form-type set-form-type">Login</p>
      <p className="form-subtitle">Welcome to LearnStack</p>
      <form onSubmit={handleSubmit}>
          <input type="checkbox" id="newUser" name="signup" />
          <div className="field">            
            <div className="control">
              <input className="input is-rounded" type="text" name="username" placeholder="Enter Username" onChange={onChange} />
            </div>
          </div>
          <div className="field">            
            <div className="control">
              <input className="input is-rounded" type="password" name="password" placeholder="Enter Password" onChange={onChange} />              
            </div>
          </div>
        <button className="button is-rounded orange-white set-form-type" type="submit">Login</button>
      </form>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),
  loginUser: user => dispatch(loginUser(user)),
});

export default connect(null, mapDispatchToProps)(UsersForm);
