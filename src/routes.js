import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './login/LoginPage';
import SignupPage from './signup/SignupPage';
import LobbyPage from './lobby/LobbyPage';

const routes = (
  <Switch>
    <Route exact path="/" component={LobbyPage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/signup" component={SignupPage} />
  </Switch>
);

export default routes;