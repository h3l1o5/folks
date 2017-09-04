import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Lobby from './lobby/Lobby'
import Room from './room/Room'
import Entry from './entry/Entry'

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.jwt ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )}
  />
)

export default (
  <Switch>
    <Route exact path="/" component={Entry} />
    <AuthRoute exact path="/lobby" component={Lobby} />
    <AuthRoute exact path="/room/:roomId" component={Room} />
    <Route path="*" render={() => <Redirect to="/" />} />
  </Switch>
)
