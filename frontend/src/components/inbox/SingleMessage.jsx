import React, { Component } from "react";
import dateFormat from 'dateformat';
import "../../css/SingleMessage.css";

const SingleMessage = ({message}) => {
  
  var now = new Date();
  return (
    <div className='threadmessage' >
      <div>Date: {dateFormat(message.date_sent)}</div>
      <div>Sender: {message.sender}</div>
      <div>Body: {message.body}</div>
    </div>   
  )
}

export default SingleMessage;