import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const HomePage = () => { 

  return (  
    <section className="hero is-large">  
      <div className="hero-head">
        <Navigation />
      </div>
      <div className="hero-body">
        <div className="container is-max-desktop">
          <p className="title">
            Community powered learning
          </p>
          <p className="subtitle">
            Discover and share the best collections of videos, articles, websites for learning things online.
          </p>
          <Link to={'/stacks'} className="button is-rounded">View Collections</Link>
        </div>
      </div>
    </section>     
  );
};

export default HomePage;