import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import _ from 'lodash'

import { Modal, Header, Button, Form, Message } from 'semantic-ui-react'

class SignupModal extends Component {
  state = {
    username: '',
    usernameValid: true,
    password: '',
    passwordValid: true,
    error: false,
    errorMessage: '',
    success: false,
  }

  handleSubmit = () => {
    const { username, password } = this.state
    let isValid = true
    if (_.isEmpty(username)) {
      this.setState({ usernameValid: false })
      isValid = false
    } else {
      this.setState({ usernameValid: true })
    }
    if (_.isEmpty(password)) {
      this.setState({ passwordValid: false })
      isValid = false
    } else {
      this.setState({ passwordValid: true })
    }

    if (isValid) {
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
    return (
      <Modal
        open={this.props.show}
        onClose={this.props.onClose}
        size="small"
        closeIcon
      >
        <Header icon="address card outline" color="grey" content="NEW USER" />
        <Modal.Content>
          <Form
            loading={this.state.isLoading}
            error={this.state.error}
            success={this.state.success}
          >
            <Message
              success
              header="Signup Successful"
              content="Welcome! Back to login page and login"
            />
            <Message
              error
              header="Signup Failed"
              content={this.state.errorMessage}
            />
            <Form.Input
              width={16}
              label="Username"
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
              required
              disabled={this.state.success}
              error={!this.state.usernameValid}
            />
            <Form.Input
              width={16}
              type="password"
              label="Password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              required
              disabled={this.state.success}
              error={!this.state.passwordValid}
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
            disabled={this.state.success}
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
