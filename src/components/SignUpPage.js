import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthNav from './AuthNav';
import { createUser } from '../actions';

const SignUpPage = props => {
  const { createUser, user } = props;
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
      history.push('/stacks');
    }
  }, [user]);

  return (
    <>
      <AuthNav />
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
              <Link to='/login' className='change-auth'>Login Instead</Link> 
            </div>      
        </div>
      </section>
    </>
    );
};

SignUpPage.propTypes = {
  createUser: PropTypes.func.isRequired,   
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
