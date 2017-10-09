import React, { Component } from 'react'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import classnames from 'classnames'

import { setCurrentUser } from '../actions/authActions'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import { usernameValidator, passwordValidator } from '../utils/validate'

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

    const { username, password } = this.state
    const UV = usernameValidator(username)
    const PV = passwordValidator(password)

    this.setState({
      usernameValid: UV,
      passwordValid: PV,
    })

    if (UV && PV) {
      this.setState({ isLoading: true })
      axios
        .post('/api/v1/auth', {
          username,
          password,
        })
        .then(res => {
          this.setState({ isLoading: false, hasError: false })
          localStorage.setItem('jwt', res.data.token)
          setAuthorizationToken(res.data.token)
          this.props.setCurrentUser(jwtDecode(res.data.token))
        })
        .catch(() => {
          this.setState({ isLoading: false, hasError: true })
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
