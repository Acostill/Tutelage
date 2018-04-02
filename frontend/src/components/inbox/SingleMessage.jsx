import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import "../../css/SingleMessage.css";

class SingleMessage extends Component {
  confirmRead = () => {
    const { message } = this.props;
    console.log('hello', message)
    axios.patch('/users/confirm_read', {messageId: message.id});
  }
  componentDidMount() {
    this.confirmRead();
    // this.props.getUnreadMessages();
  }
  render () {
    const { confirmRead } = this;
    const { message } = this.props;
    return (
      <div className='threadmessage' onHover={confirmRead} >
        <div>Date: {message.date_sent}</div>
        <div>Sender: {message.sender}</div>
        <div>Body: {message.body}</div>
      </div>   
    )
  }
}

export default SingleMessage;
