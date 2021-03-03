import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setUser, logoutUser } from '../actions';
import { connect } from 'react-redux';
import UsersForm from './UsersForm';

const Navigation = props => {  
  const { user, setUser, logoutUser } = props;
  let loggedInUser = localStorage.getItem('user');
  const setType = document.querySelectorAll('.set-form-type');  
  const [activeModal, setActiveModal] = useState(false);
  const closeModal = () => setActiveModal(false);    

  const changeModalText = text => {
    [...setType].map(tag => tag.innerHTML = text );
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
    };
    
  };

  const logOut = () => {
    logoutUser();
    localStorage.clear();
  };  

  const handleUser = () => {
    if (loggedInUser) {      
      setUser(loggedInUser);      
    };
    setActiveModal(false);    
  };

  useEffect(() => {        
    handleUser();
  }, [setUser]);

  return (
    <>
      <nav className="navbar">
        <div className="container is-max-desktop">
          <div className="navbar-brand">
            <Link to={'/'} className="navbar-item">
              {/* <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" /> */}
              LearnStack
            </Link>
            <span className="navbar-burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end user-buttons">              
              {!loggedInUser &&
                <>
                <span className="navbar-item">
                  <button className="button is-rounded" onClick={() => setModal(false)}>                 
                    <span>Login</span>
                  </button>
                </span>
                <span className="navbar-item">
                  <button className="button is-rounded" onClick={() => setModal(true)}>            
                    <span>Sign Up</span>
                  </button>
                </span>
                </>
              }
              {loggedInUser &&                
                <span className="navbar-item">
                  <button className="button is-rounded" onClick={logOut}>                 
                    <span>Logout</span>
                  </button>
                </span>               
              }
            </div>
          </div>
        </div>
      </nav>
      <div className={`modal ${activeModal ? "is-active" : ""}`} id="userModal">
        <div className="modal-background"></div>
        <div className="modal-content">
          <UsersForm handleUser={handleUser} />
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
      </div>
    </>
  );
};


const mapStateToProps = state => ({
  user: state.user,  
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),  
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
