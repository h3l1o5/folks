import React, { Component } from 'react'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import validator from 'validator'
import classnames from 'classnames'

import { setCurrentUser } from '../actions/authActions'
import setAuthorizationToken from '../utils/setAuthorizationToken'

class LoginForm extends Component {
  state = {
    username: '',
    usernameValid: true,
    password: '',
    passwordValid: true,
    isLoading: false,
    hasError: false,
  }

  handleSubmit = e => {
    e.preventDefault()

    let isValid = true
    const { username, password } = this.state

    if (validator.isEmpty(username)) {
      this.setState({ usernameValid: false })
      isValid = false
    } else {
      this.setState({ usernameValid: true })
    }
    if (validator.isEmpty(password)) {
      this.setState({ passwordValid: false })
      isValid = false
    } else {
      this.setState({ passwordValid: true })
    }

    if (isValid) {
      this.setState({ isLoading: true })
      axios
        .post('/api/v1/auth', {
          username,
          password,
        })
        .then(res => {
          this.setState({ isLoading: false })
          this.setState({ hasError: false })
          localStorage.setItem('jwt', res.data.token)
          setAuthorizationToken(res.data.token)
          this.props.setCurrentUser(jwtDecode(res.data.token))
        })
        .catch(() => {
          this.setState({ isLoading: false })
          this.setState({ hasError: true })
        })
    }
  }

  render() {
    const {
      username,
      usernameValid,
      password,
      passwordValid,
      isLoading,
      hasError,
    } = this.state
    return (
      <div id="loginForm">
        <form
          className={classnames('ui', 'large', 'form', {
            loading: isLoading,
            error: hasError,
          })}
        >
          <div className="ui error message">
            <div className="header">Login Failed</div>
            <p>Incorrect username or password</p>
          </div>

          <div
            id="usernameField"
            className={classnames('field', { error: !usernameValid })}
          >
            <label>USERNAME</label>
            <div className="ui left icon input">
              <input
                type="text"
                name="username"
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
                placeholder="username"
              />
              <i className="id badge icon" />
            </div>
          </div>

          <div
            id="passwordField"
            className={classnames('field', { error: !passwordValid })}
          >
            <label>PASSWORD</label>
            <div className="ui left icon input">
              <input
                type="password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                name="password"
                placeholder="password"
              />
              <i className="lock icon" />
            </div>
          </div>

          <div id="loginButton">
            <button className="ui button secondary" onClick={this.handleSubmit}>
              LOGIN
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { setCurrentUser })(LoginForm)
