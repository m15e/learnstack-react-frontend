import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Navigation from './Navigation';
import { loginUser } from '../actions';

const LoginPage = props => {
  const { loginUser } = props;

const [form, setForm] = useState({});

const onChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
};

const handleSubmit = e => {
  e.preventDefault();

  const user = {
    username: form.username,
    password: form.password,
  };

  loginUser(user);

  e.target.reset();
};

return (
  <section className="sign-up">
    <div className="users-form">
      <p className="form-type set-form-type">Login</p>      
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
      <Link to='/signup' className='change-auth'>Sign Up Instead</Link> 
    </div>
  </section>
  );
};

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,   
};

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),  
});

export default connect(null, mapDispatchToProps)(LoginPage);
