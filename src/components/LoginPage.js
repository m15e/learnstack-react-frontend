import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthNav from './AuthNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser, loginSuccess } from '../actions';

const LoginPage = props => {
  const { loginUser, loginSuccess, user, message } = props;
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

    loginUser(user);

    e.target.reset();
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {   
      loginSuccess();
      history.push('/stacks');
    }
    if (message === 'Invalid username or password') {
      toast.error(message);
    }
  }, [user, message]);

  return (
    <>
      <AuthNav />
      <ToastContainer />
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
    </>
    );
};

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,   
  loginSuccess: PropTypes.func.isRequired,   
};

const mapStateToProps = state => ({
  user: state.user,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),  
  loginSuccess: () => dispatch(loginSuccess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
