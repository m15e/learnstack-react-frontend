import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import AuthNav from './AuthNav';
import 'react-toastify/dist/ReactToastify.css';
import { createUser, toastMessage } from '../actions';

const SignUpPage = props => {
  const {
    createUser, user, message, toastMessage,
  } = props;
  const history = useHistory();

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

    createUser(user);

    e.target.reset();
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      toastMessage('Welcome, signup successful!');
      history.push('/stacks');
    }
    if (message === 'Error username already exists or invalid') {
      toast.error(message);
    }
  }, [user, message]);

  return (
    <>
      <AuthNav />
      <ToastContainer />
      <section className="sign-up">
        <div className="container">
          <div className="users-form">
            <p className="form-type set-form-type">Sign Up</p>
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
            <Link to="/login" className="change-auth">Login Instead</Link>
          </div>
        </div>
      </section>
    </>
  );
};

SignUpPage.defaultProps = {
  user: {
    username: '',
    token: '',
    id: 1,
  },
  message: '',
};

SignUpPage.propTypes = {
  createUser: PropTypes.func.isRequired,
  toastMessage: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    token: PropTypes.string,
  }),
  message: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.user,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),
  toastMessage: message => dispatch(toastMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
