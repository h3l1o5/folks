import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'

import App from './App'
import rootReducer from './reducers/rootReducer'
import { setCurrentUser } from './actions/authActions'
import setAuthorizationToken from './utils/setAuthorizationToken'

import 'semantic-ui-css/semantic.min.css'
import './index.css'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

if (localStorage.jwt) {
  // set jwt to all axios actions
  setAuthorizationToken(localStorage.jwt)
  // set userinfo(decode from jwt) in store.auth.user
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwt)))
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
