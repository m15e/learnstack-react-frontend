import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StackPage from './components/StackPage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/stack/:stackId" component={StackPage} />     
    </Switch>
  </BrowserRouter>
);

export default Routes;