import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser, logoutUser } from '../actions';
import UsersForm from './UsersForm';

const Navigation = props => {
  const { setUser, logoutUser } = props;
  const loggedInUser = localStorage.getItem('user');      
  const history = useHistory();
    

  const logOut = () => {
    logoutUser();
    localStorage.clear();
    history.push('/');
  };

  const handleUser = () => {
    if (localStorage.getItem('user')) {
      setUser(localStorage.getItem('user'));
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    handleUser();
  }, [setUser]);

  return (
    <>
      <nav className="navbar">
        <div className="container is-max-desktop nav-container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              LearnStack
            </Link>
          </div>
          <div id="navbarMenu" className="nav">
            <div className="navbar-end user-buttons">
              {!loggedInUser
                && (
                <>
                  <span className="navbar-item">
                    <Link to="/login" className="button is-rounded orange-white">
                      <span>Login</span>
                    </Link>                    
                  </span>
                  <span className="navbar-item">
                    <Link to="/signup" className="button is-rounded orange-white">
                      <span>Sign Up</span>
                    </Link>                    
                  </span>                
                </>
                )}
              {loggedInUser
                && (
                <span className="navbar-item">
                  <button type="button" className="button is-rounded orange-white" onClick={logOut}>
                    <span>Logout</span>
                  </button>
                </span>
                )}
            </div>          
          </div>
        </div>
      </nav>      
    </>
  );
};

Navigation.propTypes = {
  setUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
