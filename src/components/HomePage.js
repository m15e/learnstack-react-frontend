import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navigation from './Navigation';

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.push('/stacks');
    }
  }, []);

  return (
    <section className="hero is-large">
      <div className="gradient-bg" />
      <div className="hero-head">
        <Navigation />
      </div>
      <div className="hero-body">
        <div className="container is-max-desktop">
          <p className="title">
            Community powered learning
          </p>
          <p className="subtitle">
            Discover and share the best collections of videos,
            articles, websites for learning things online.
          </p>
          <Link to="/signup" className="button orange-white is-rounded">Start Learning Now</Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
