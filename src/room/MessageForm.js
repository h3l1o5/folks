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
    }
  }

  handleSubmit = event => {
    if (event && event.keyCode !== KEY_CODE_OF_ENTER) return

    /**
     * click submit button or press `enter`
     */
    this.props.onSubmit(this.state.messageContent)
    this.setState({ messageContent: '' })
  }

  render() {
    return (
      <div className="messageForm">
        <input
          type="text"
          value={this.state.messageContent}
          placeholder={this.props.placeholder}
          onChange={e => this.setState({ messageContent: e.target.value })}
          onKeyUp={event => this.handleSubmit(event)}
        />
        <button className="sendMessageButton">
          <span
            role="button"
            tabIndex="0"
            onClick={() => this.handleSubmit(null)}
          >
            <Icon color="primary">send</Icon>
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
