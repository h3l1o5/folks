import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as ReactDOM from 'react-dom'

import Message from './Message'

import './MessageList.css'

class MessageList extends Component {
  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    const { messageList } = this.refs
    const scrollHeight = messageList.scrollHeight
    const height = messageList.clientHeight
    const maxScrollTop = scrollHeight - height
    ReactDOM.findDOMNode(messageList).scrollTop =
      maxScrollTop > 0 ? maxScrollTop : 0
  }

  render() {
    return (
      <div className="messageList" ref="messageList">
        {this.props.messages.map(message => (
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
