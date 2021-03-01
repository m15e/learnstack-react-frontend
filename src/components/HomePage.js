import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { Link } from 'react-router-dom';
import UsersForm from './UsersForm';

const HomePage = props => {
  const userModal = document.querySelector('#userModal');

  const toggleModal = () => userModal.classList.toggle('is-active');

  const setModal = newUser => {
    const userCheckBox = document.querySelector('#newUser');
    

    if (newUser) {
      console.log(userCheckBox);
      userModal.classList.toggle('is-active');
    } else {
      console.log(userCheckBox);
      userModal.classList.toggle('is-active');
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
    <div class="modal" id="userModal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <UsersForm />
      </div>
      <button class="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
    </div>
  </>
  );
};

export default HomePage;