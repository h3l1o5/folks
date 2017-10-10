import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Modal, Header, Button, Form, Message } from 'semantic-ui-react'
import { usernameValidator, passwordValidator } from '../utils/validate'

class SignupModal extends Component {
  state = {
    username: '',
    usernameValid: true,
    password: '',
    passwordValid: true,
    error: false,
    errorMessage: '',
    success: false,
    isLoading: false,
  }

  handleSubmit = () => {
    const { username, password } = this.state

    const UV = usernameValidator(username)
    const PV = passwordValidator(password)

    this.setState({ usernameValid: UV, passwordValid: PV })

    if (UV && PV) {
      this.setState({ isLoading: true })
      axios
        .post('/api/v1/users', {
          username,
          password,
        })
        .then(() =>
          this.setState({ success: true, error: false, isLoading: false })
        )
        .catch(err => {
          this.setState({
            error: true,
            errorMessage: err.response.data.error.message,
            isLoading: false,
          })
        })
    }
  }

  render() {
    const { show, onClose } = this.props
    const {
      username,
      password,
      usernameValid,
      passwordValid,
      isLoading,
      error,
      success,
      errorMessage,
    } = this.state
    return (
      <Modal open={show} onClose={onClose} size="small" closeIcon>
        <Header icon="address card outline" color="grey" content="NEW USER" />
        <Modal.Content>
          <Form loading={isLoading} error={error} success={success}>
            <Message
              success
              header="Signup Successful"
              content="Welcome! Back to login page and login"
            />
            <Message error header="Signup Failed" content={errorMessage} />
            <Form.Input
              width={16}
              label="Username"
              placeholder="Username"
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
              required
              disabled={success}
              error={!usernameValid}
            />
            <Form.Input
              width={16}
              type="password"
              label="Password"
              placeholder="Password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              required
              disabled={success}
              error={!passwordValid}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            inverted
            onClick={() => {
              this.handleSubmit(this.state)
            }}
            disabled={success}
          >
            Signup
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

SignupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default SignupModal
