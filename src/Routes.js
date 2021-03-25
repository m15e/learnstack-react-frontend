import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import StackPage from './components/StackPage';
import StackIndex from './components/StackIndex';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route path="/stacks" component={StackIndex} />
      <Route path="/stack/:stackId" component={StackPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
