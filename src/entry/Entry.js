import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginForm from './LoginForm'
import SignupModal from './SignupModal'

import './Entry.css'

class Entry extends Component {
  state = {
    showModal: false,
  }

  handleSignupButtinClick = () => {
    this.setState({ showModal: true })
  }

  handleSignupModalClose = () => {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div className="container">
        {this.props.auth.user.username && <Redirect to="/lobby" />}
        <div id="brand">
          <h1>folks</h1>
        </div>
        <LoginForm onSubmit={this.handleLoginFormSubmit} />
        <button
          id="signupButton"
          className="ui secondary basic button"
          onClick={this.handleSignupButtinClick}
        >
          SIGNUP
        </button>

        <SignupModal
          show={this.state.showModal}
          onClose={this.handleSignupModalClose}
        />
      </div>
    )
  }
}

Entry.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(Entry)
