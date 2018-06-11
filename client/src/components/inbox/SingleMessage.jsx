import React, { Component } from "react";
import dateFormat from 'dateformat';
import "../../css/SingleMessage.css";

const SingleMessage = ({ message, currentUser }) => {
  const messageClass =
    message.sender === currentUser.username
      ? "currentUserMessage"
      : "otherUserMessage";

  return (
    <div className={messageClass}>
      <div className="message-header">
        <div className="message-date">{dateFormat(message.date_sent)}</div>
        <div className="message-sender">{message.sender}</div>
      </div>
      <div className="message-body-container">
        <div className="message-body-content">{message.body}</div>
      </div>
    </div>
  );
};

export default SingleMessage;