import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Navigation from './Navigation';
import { createUser } from '../actions';

const LoginPage = () => {

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

export default LoginPage;
