import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Navigation from './Navigation';
import { createUser } from '../actions';

const SignUpPage = () => {

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
    <div className="container">
        <div className="users-form">
          <p className="form-type set-form-type">Sign Up</p>
          <p className="form-subtitle">Join LearnStack</p>
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
            <button className="button is-rounded orange-white set-form-type" type="submit">Sign Up</button>
          </form>
        </div>      
    </div>
  </section>
  );
};

export default SignUpPage;
