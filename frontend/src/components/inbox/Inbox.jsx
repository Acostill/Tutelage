import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import ThreadMessages from './ThreadMessages';
import SingleMessage from "./SingleMessage";
import "../../css/Inbox.css";

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      userThreads: [],
      username: "",
    }
  }

  getUserThreads = () => {
    axios
      .get('/users/userthreads')
      .then(res => {
        this.setState({
          userThreads: res.data.threads,
        })
      })
  }

  renderInbox = () => {
    const { userThreads } = this.state;
    const { unreadMessages } = this.props;
    const unreadThreadIds = unreadMessages.map(message => message.thread_id);
    const styleRead = {color: 'black', border: '1px solid black', backgroundColor: 'white'}
    const styleUnread = {color: 'black', border: '1px solid black', backgroundColor: 'pink'}
    let style;
    let read = '';

    return (
      <div className="inbox-container">
        Inbox {unreadMessages.length} Unread messages
        {userThreads.map(thread => {
          unreadThreadIds.includes(thread.id) ? style = styleUnread : style = styleRead
          style === styleUnread ? read = 'Unread' : read = ''
          return (         
          <Link to={`/inbox/${thread.id}`} style={{textDecoration: 'none'}}>
            <div style={style} >
              Thread ID: {thread.id} <b>{read}</b>
              <br />
              Subject: {thread.subject} 
            </div>
          </Link>
          )
        }
        )}
      </div>
    )
  }

  renderThreadMessages = (props) => {
    const { getUnreadMessages } = this.props;
    return <ThreadMessages thread_id={props.match.params.thread_id} getUnreadMessages={getUnreadMessages} />
  }

  componentDidMount() {
    const { getUserThreads } = this;
    const { getUnreadMessages } = this.props
    getUserThreads();
    getUnreadMessages();
  }
  render() {
    const { renderInbox, getUnreadMessages, renderThreadMessages } = this;
    const { userThreads, threadClicked } = this.state;

    return (
      <div>
        <Switch>
          <Route exact path='/inbox' render={renderInbox} />
          <Route path='/inbox/:thread_id' render={renderThreadMessages}/>
        </Switch>
      </div>
    )
  }
}

export default Inbox;