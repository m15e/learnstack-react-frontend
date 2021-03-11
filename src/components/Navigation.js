import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser, logoutUser } from '../actions';
import UsersForm from './UsersForm';

const Navigation = props => {
  const { setUser, logoutUser } = props;
  const loggedInUser = localStorage.getItem('user');
  const setType = document.querySelectorAll('.set-form-type');
  const [activeModal, setActiveModal] = useState(false);
  const closeModal = () => setActiveModal(false);

  const changeModalText = text => {
    // eslint-disable-next-line
    [...setType].map(tag => tag.innerHTML = text);
  };

  const setModal = newUser => {
    const userCheckBox = document.querySelector('#newUser');

    if (newUser) {
      userCheckBox.checked = true;
      setActiveModal(true);
      changeModalText('Sign up');
    } else {
      userCheckBox.checked = false;
      setActiveModal(true);
      changeModalText('Sign in');
    }
  };

  const logOut = () => {
    logoutUser();
    localStorage.clear();
  };

  const handleUser = () => {
    if (localStorage.getItem('user')) {
      setUser(localStorage.getItem('user'));
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
                    <button type="button" className="button is-rounded orange-white" onClick={() => setModal(false)}>
                      <span>Login</span>
                    </button>
                  </span>
                  <span className="navbar-item">
                    <button type="button" className="button is-rounded orange-white" onClick={() => setModal(true)}>
                      <span>Sign Up</span>
                    </button>
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
      <div className={`modal ${activeModal ? 'is-active' : ''}`} id="userModal">
        <div className="modal-background" />
        <div className="modal-content">
          <UsersForm handleUser={handleUser} />
        </div>
        <button type="button" className="modal-close is-large" aria-label="close" onClick={closeModal} />
      </div>
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
