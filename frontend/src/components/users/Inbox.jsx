import React, { Component } from 'react';

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }
  getMessages = () => {
    this.setState({
      messages: ''
    })
  }

  componentDidMount() {
    this.getMessages()
  }
  render() {
    return (
      <div>
        Inbox
      </div>
    )
  }
}

export default Inbox;