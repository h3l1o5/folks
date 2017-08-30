import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Message from './Message'

import './MessageList.css'

class MessageList extends Component {
  render() {
    return (
      <div className="messageList">
        {this.props.messages.map((message) => (
          <Message 
            key={Math.random()} 
            createBy={message.createBy} 
            createAt={message.createAt}
            content={message.content}
          />
        ))}
      </div>
    )
  }
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
}

export default MessageList