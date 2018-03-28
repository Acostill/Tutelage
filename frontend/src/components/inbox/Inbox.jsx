import React, { Component } from 'react';
import ThreadMessages from './ThreadMessages';
import { Link, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      userThreads: []
    }
  }

  getUserThreads = () => {
    axios
      .get('/users/userthreads')
      .then(res => {

        this.setState({
          userThreads: res.data.threads,
          resData: res.data.threads,
          temp: [{id: 1}, {id:3}]
        })
      })
  }
  
  renderInbox = () => {
    const { userThreads } = this.state;
    return (
      <div>
        Inbox
        {userThreads.map(thread => {
          return (         
          <Link to={`/inbox/${thread.id}`} style={{textDecoration: 'none'}}>
            <div style={{color: 'black', border: '1px solid black'}} >
              Thread ID: {thread.id}
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

  componentDidMount() {
    this.getUserThreads();
  }
  render() {
    const { userThreads, threadClicked } = this.state;
    const { renderInbox } = this;
    console.log({inboxState: this.state})
    return (
      <div>
        <Switch>
          <Route exact path='/inbox' render={renderInbox} />
          <Route path='/inbox/:thread_id' component={ThreadMessages}/>
        </Switch>
      </div>
    )
  }
}

export default Inbox;