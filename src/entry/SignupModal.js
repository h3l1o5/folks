import React, { Component } from 'react'
import axios from 'axios'

import { Modal, Header, Button, Form, Message } from 'semantic-ui-react'

class SignupModal extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordComfirmation: '',
    error: false,
    errorMessage: '',
    success: false,
  }

  handleSubmit = () => {
    // TODO: check validation before post to server
    const { username, email, password } = this.state
    this.setState({ isLoading: true })
    axios
      .post('/api/v1/users', {
        username,
        email,
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
            <Form.Group>
              <Form.Input
                width={6}
                label="Username"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
                required
                disabled={this.state.success}
              />
              <Form.Input
                width={10}
                type="email"
                label="Email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                required
                disabled={this.state.success}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                type="password"
                label="Password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
                disabled={this.state.success}
              />
              <Form.Input
                type="password"
                label="Password Comfirmation"
                placeholder="Password Comfirmation"
                value={this.state.passwordComfirmation}
                onChange={e =>
                  this.setState({ passwordComfirmation: e.target.value })}
                required
                disabled={this.state.success}
              />
            </Form.Group>
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

export default SignupModal
