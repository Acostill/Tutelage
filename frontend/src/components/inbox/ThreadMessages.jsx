import React, { Component } from 'react';
import axios from 'axios';
import SingleMessage from './SingleMessage';

class Thread extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      userMessage: ''
    }
  }

  getMessages = () => {
    // let thread = this.props.thread;
    let thread_id = this.props.match.params.thread_id;
    axios
      .post('/users/threadmessages', { thread_id: thread_id })
      .then(res => {
        this.setState({
          messages: res.data.threadMessages
        })
      })
  }

  handleTextarea = e => {
    this.setState({
      userMessage: e.target.value
    });
  };

  clearMessage = () => {
    this.setState({
      userMessage: ""
    });
  };

  sendMessage = () => {
    const { userMessage } = this.state;
    const threadID = this.props.match.params.thread_id;
    if (!userMessage) return;
    axios
      .post('/users/send_message', {threadID: threadID, body: userMessage})
      .then(res => {
        this.setState({
          userMessage: ''
        })
        this.getMessages();
      })
  }

  componentWillMount() {
    this.getMessages();
  }

  render() {
    const { handleTextarea, clearMessage, sendMessage } = this;
    const { user, messages, userMessage } = this.state;
    // const { getUnreadMessages } = this.props;
    console.log('ThreadMessages ln 60', this)
    let thread_id = this.props.match.params.thread_id;

    return (
      <div>
        Thread ID: {thread_id}
        {messages.map(message => <SingleMessage message={message} /> )}
        <div className="background-banner orange-background">
          <div id="chat-box" className="margin-top">
            <label>
              <h2> Let's chat: </h2>
            </label>
            <textarea
              name="message"
              id="message-box"
              cols="30"
              rows="5"
              placeholder="Write your message here ..."
              value={userMessage}
              onChange={handleTextarea}
            />
            <div className="chat-buttons">
              <input
                type="submit"
                value="Submit Message"
                className="submit button-size"
                onClick={sendMessage}
              />
              <button className="clear button-size" onClick={clearMessage}>
                {" "}
                Clear{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Thread;