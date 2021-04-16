import React from 'react';
import { Link } from 'react-router-dom';

const AuthNav = () => (
  <nav className="navbar">
    <div className="container is-max-desktop nav-container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          LearnStack
        </Link>
      </div>
    </div>
  </nav>
);

export default AuthNav;
