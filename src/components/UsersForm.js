import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser, loginUser } from '../actions';

const UsersForm = props => {
  const { createUser, loginUser, handleUser } = props;

  const [form, setForm] = useState({});
  const newUser = document.querySelector('#newUser');

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

    if (newUser.checked) {
      createUser(user);
    } else {
      loginUser(user);
    }

    handleUser();
    e.target.reset();
  };

  return (
    <div className="users-form">
      <p className="form-type set-form-type">Sign in</p>
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
        <button className="button is-rounded orange-white set-form-type" type="submit">Sign in</button>
      </form>
    </div>
  );
};

UsersForm.propTypes = {
  createUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  handleUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),
  loginUser: user => dispatch(loginUser(user)),
});

export default connect(null, mapDispatchToProps)(UsersForm);
