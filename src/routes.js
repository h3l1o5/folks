import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Lobby from './lobby/Lobby'
import Room from './room/Room'

export default (
  <Switch>
    <Route exact path='/app/lobby' component={Lobby} />
    <Route exact path='/app/room' component={Room} />
  </Switch>
)