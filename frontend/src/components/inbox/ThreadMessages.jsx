import React, { Component } from 'react';
import axios from 'axios';

class Thread extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
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

  componentWillMount() {
    this.getMessages()
  }

  render() {
    const { messages } = this.state;
    let thread_id = this.props.match.params.thread_id;

    return (
      <div>       
        Thread ID: {thread_id}
        {messages.map(message =>
          <div className='threadmessage' >
            <div>Date: {message.date_sent}</div>
            <div>Sender: {message.sender}</div>
            <div>Body: {message.body}</div>
          </div>)
        }
        
      </div>
    )
  }
}

export default Thread;