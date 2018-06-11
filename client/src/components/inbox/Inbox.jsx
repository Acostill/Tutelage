import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import ThreadMessages from "./ThreadMessages";
import SingleMessage from "./SingleMessage";
import "../../css/Inbox.css";

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      userThreads: [],
      username: ""
    };
  }

  getUserThreads = () => {
    axios.get("/users/userthreads").then(res => {
      this.setState({
        userThreads: res.data.threads
      });
    });
  };

  renderInbox = () => {
    const { userThreads } = this.state;
    const { unreadMessages } = this.props;
    const unreadThreadIds = unreadMessages.map(message => message.thread_id);
    const styleRead = {
      display: "flex",
      flexDirection: "column",
      color: "white",
      border: "4px solid #7E7E7E",
      backgroundColor: "#7E7E7E",
      borderRadius: "70px 70px",
      margin: "40px 80px 40px 80px",
      fontSize: "20px",
      padding: "20px",
      paddingLeft: "50px"
    };
    const styleUnread = {
      display: "flex",
      flexDirection: "column",
      color: "black",
      border: "4px solid #f46524",
      backgroundColor: "#f46524",
      borderRadius: "70px 70px",
      margin: "40px 80px 40px 80px",
      fontSize: "20px",
      padding: "20px",
      paddingLeft: "50px"
    };
    let style;
    let isRead = isRead;

    const inboxStyle = {
      textDecoration: "none"
    };

    return (
      <div className="inbox-container">
        <h1 className="inbox-title" > Messages </h1>
        <h2 className="inbox-unread-title" >
          {" "}
          {unreadMessages.length} Unread messages
          {" "}
        </h2>
        <div className="one-inbox">
          {userThreads.map(thread => {
            unreadThreadIds.includes(thread.id)
              ? (style = styleUnread)
              : (style = styleRead);
            style === styleUnread ? (isRead = "Unread") : (isRead = null);
            return (
              <Link to={`/inbox/${thread.id}`} style={inboxStyle}>
                <div style={style} className="hover-thread-message" >
                  <strong>{isRead}</strong>
                  <div className="subject-thread"> 
                  Subject:{" "} {thread.subject} </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  renderThreadMessages = props => {
    const { getUnreadMessages, currentUser } = this.props;
    return (
      <ThreadMessages
        thread_id={props.match.params.thread_id}
        getUnreadMessages={getUnreadMessages}
        currentUser={currentUser}
      />
    );
  };

  componentDidMount() {
    const { getUserThreads } = this;
    const { getUnreadMessages } = this.props;
    getUserThreads();
    getUnreadMessages();
  }
  render() {
    const { renderInbox, getUnreadMessages, renderThreadMessages } = this;
    const { userThreads, threadClicked } = this.state;

    return (
      <div>
        <Switch>
          <Route exact path="/inbox" render={renderInbox} />
          <Route path="/inbox/:thread_id" render={renderThreadMessages} />
        </Switch>
      </div>
    );
  }
}

export default Inbox;
