import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import StackPage from './components/StackPage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/stack/:stackId" component={StackPage} />     
    </Switch>
  </BrowserRouter>
);

export default Routes;