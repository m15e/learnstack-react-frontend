import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { Link } from 'react-router-dom';
import UsersForm from './UsersForm';

const HomePage = props => {
  const userModal = document.querySelector('#userModal');
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
      changeModalText('Sign Up');
    } else {
      userCheckBox.checked = false;
      setActiveModal(true);
      changeModalText('Login');
    };
    
  };

  return (
  <>
    <section className="hero is-large">  
      <div className="hero-head">
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
              <div className="navbar-end">              
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
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="hero-body">
        <div className="container is-max-desktop">
          <p className="title">
            Community powered learning
          </p>
          <p className="subtitle">
            Discover and share the best videos, articles, websites for learning things online.
          </p>
          <button className="button is-rounded">View Stacks</button>
        </div>
      </div>
    </section>
    <div className={`modal ${activeModal ? "is-active" : ""}`} id="userModal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <UsersForm />
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
    </div>
  </>
  );
};

export default HomePage;