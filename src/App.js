import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import UsersForm from './components/UsersForm';
import StacksForm from './components/StacksForm';

const App = props => {

  const USER_API = 'http://localhost:3000/api/v1/users';
  
  // useEffect(() => {
  //   props.createUser();
  // }, []);

  return (
    <div className="App">      
      <UsersForm />
      <StacksForm />
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
  
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
