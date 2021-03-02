import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StackPage from './components/StackPage';
import StackIndex from './components/StackIndex';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/stacks" component={StackIndex} />
      <Route path="/stack/:stackId" component={StackPage} />     
    </Switch>
  </BrowserRouter>
);

export default Routes;