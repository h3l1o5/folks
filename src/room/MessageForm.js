import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'material-ui/Icon'

import { KEY_CODE_OF_ENTER } from '../utils/constant'

import './MessageForm.css'

class MessageForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageContent: '',
      submitButtonColor: 'disabled',
    }
  }

  handleInputChange = e => {
    const input = e.target.value.trim()
    this.setState({
      messageContent: e.target.value,
      submitButtonColor: input ? 'primary' : 'disabled',
    })
  }

  handleSubmit = event => {
    if (event && event.keyCode !== KEY_CODE_OF_ENTER) return

    /**
     * click submit button or press `enter`
     */
    if (!this.state.messageContent) return
    this.props.onSubmit(this.state.messageContent.trim())
    this.setState({ messageContent: '', submitButtonColor: 'disabled' })
  }

  render() {
    const { messageContent, submitButtonColor } = this.state
    const { placeholder } = this.props
    return (
      <div className="messageForm">
        <input
          type="text"
          value={messageContent}
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onKeyUp={event => this.handleSubmit(event)}
        />
        <button className="sendMessageButton">
          <span
            role="button"
            tabIndex="0"
            onClick={() => this.handleSubmit(null)}
          >
            <Icon color={submitButtonColor}>send</Icon>
          </span>
        </button>
      </div>
    )
  }
}

MessageForm.defaultProps = {
  placeholder: '',
}

MessageForm.propTypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

export default MessageForm
