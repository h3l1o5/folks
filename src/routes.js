import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Lobby from './lobby/Lobby'
import Room from './room/Room'

export default (
  <Switch>
    <Route exact path="/app/lobby" component={Lobby} />
    <Route exact path="/app/room/:roomId" component={Room} />
    <Route path="/app*" render={() => (<Redirect to="/app/lobby" />)} />
  </Switch>
)