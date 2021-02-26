import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import UsersForm from './components/UsersForm';
import StacksForm from './components/StacksForm';
import StacksList from './components/StacksList';

const App = props => {

  const USER_API = 'http://localhost:3000/api/v1/users';
  
  // useEffect(() => {
  //   props.createUser();
  // }, []);

  return (
    <div className="App container">      
      <UsersForm />
      <StacksForm />
      <StacksList />
    </div>
  );
}

// const mapStateToProps = state => ({
//   user: {
//     user_id: null,
//     token: '',
//   },
//   stacks: {
//     items: [],
//     item: {},
//   }
// });

// const mapDispatchToProps = {
  
// };

export default App; //connect(mapStateToProps, mapDispatchToProps)(App);
