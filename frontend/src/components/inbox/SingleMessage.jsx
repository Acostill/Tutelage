import React, { Component } from "react";
import "../../css/SingleMessage.css";

const SingleMessage = ({message}) => {

  return (
    <div className='threadmessage' >
      <div>Date: {message.date_sent}</div>
      <div>Sender: {message.sender}</div>
      <div>Body: {message.body}</div>
    </div>   
  )
}

export default SingleMessage;
