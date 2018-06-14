import React, { Component } from 'react';
import axios from 'axios';
import SingleMessage from './SingleMessage';
import "../../css/ThreadMessages.css";

class Thread extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      userMessage: ''
    }
  }

  getMessages = () => {
    let thread_id = this.props.thread_id;
    axios
      .post('/users/threadmessages', { thread_id: thread_id })
      .then(res => {
        const messages = res.data.threadMessages;
        this.setState({
          messages: messages
        })
        this.confirmRead(messages);
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
    const thread_id = this.props.thread_id;
    if (!userMessage) return;
    axios
      .post('/users/send_message', {thread_id: thread_id, body: userMessage})
      .then(res => {
        this.setState({
          userMessage: ''
        })
        this.getMessages();
      })
  }

  confirmRead = (messages) => {
    const { getUnreadMessages } = this.props;
    const requests = messages.map(message =>  axios.patch('/users/confirm_read', {messageId: message.id}))
    Promise.all(requests).then(() => {
      getUnreadMessages();
    })
  }

  componentDidMount() {
    const {  getUnreadMessages } = this.props;
    this.getMessages();
   getUnreadMessages();

  }

  render() {
    const { handleTextarea, clearMessage, sendMessage, confirmRead } = this;
    const { user, messages, userMessage} = this.state;
    const { currentUser } = this.props;
    let thread_id = this.props.thread_id;


    return (
      <div id="thread-messages-container" >
        <h1 className="thread-message-title" > 
        MESSAGES </h1>
        
        <div className="conversation center" >

        {messages.map(message => <SingleMessage message={message} confirmRead={confirmRead} currentUser={currentUser} /> )}
        </div>

        <div className="center margin">
          <div id="chat-box" className="margin-top chatbox-thread">
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