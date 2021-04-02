import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthNav from './AuthNav';
import { loginUser } from '../actions';

const LoginPage = props => {
  const { loginUser, user, error } = props;
  const history = useHistory();
  let funky = '';

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
      history.push('/stacks');
    }
  }, [user, error]);

  return (
    <>
      <AuthNav />
      <section className="sign-up">
        <div className="users-form">
          <p className="form-type set-form-type">{ error.message ? 'Invalid credentials, please try again' : 'Login' }</p>      
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
};

const mapStateToProps = state => ({
  user: state.user,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
