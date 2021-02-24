import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { createUser } from './actions';
import axios from 'axios';

const App = props => {

  const USER_API = 'http://localhost:3000/api/v1/users';
  
  useEffect(() => {
    props.createUser();
  }, []);

  return (
    <div className="App">
      <h1>Sign up</h1>
    </div>
  );
}

const mapStateToProps = state => ({
  user: {
    user_id: null,
    token: '',
  },
});

const mapDispatchToProps = {
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
