import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import '../css/temp.css';
import axios from 'axios';
import Home from './Home';
// import Profile from './Profile';
import SearchUsers from './users/SearchUsers';
import { Redirect } from 'react-router';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      unreadMessages: []
    }
  }

  onLoadNav = () => {
    return (
      <nav id="navigation-bar">
        <Link id="app-name" to="/"> Tutelage </Link>
        {" "}
        <div className="nav-right">
        Loading...
        </div>
      </nav>
    )
  }

  loggedOutNav = () => {
    return (
      <div>
      <nav id="navigation-bar">
        <Link id="app-name" to="/"> Tutelage </Link>
        {" "}
        <div className="nav-right">
        <Link to="/login"  > Log In </Link>

        <Link to="/aboutus" > About Us </Link>
        </div>
      </nav>
      <Redirect to={`/`} />
      </div>
    )
  }

  loggedInNav = () => {
    const { user, logOut, unreadMessages } = this.props;
    console.log({unreadMessages});

    return (
      <nav id='navigation-bar'>
      <Link id="app-name" to="/"> Tutelage </Link>
      {" "}
      <div className="nav-right-loggedin">
        <Link to="/search"  >
        <FontAwesomeIcon icon={["fas", "search"]} size="2x" />
        </Link>

        <Link to="/inbox" className="inbox-link" > 
        <FontAwesomeIcon icon={["fas", "envelope"]} size="2x" />
         { unreadMessages.length ? <div className="red">{ unreadMessages.length } </div> : ''} 
         </Link>
      
        <Link to={`/users/${user.username}`} > 
        <FontAwesomeIcon icon={["fas", "user-circle"]} size="2x" />
        </Link>
        
        <Link to={`/survey`} > Tutelage Survey </Link>
        {" "}
        <button type="button" id="logout-button" onClick={logOut}> Log Out </button>
      </div>
    </nav>
    ) 
  }

  getUnreadMessages = () => {
    axios
      .get('/users/unread_messages')
      .then(res => {
        this.setState({
          unreadMessages: res.data.unreadMessages
        })
      })
      .catch(err => {
        this.setState({
          error: `Error Caught: ${err}`
        })
      })
  }
  componentWillReceiveProps(nextProps) {
    const { getUnreadMessages } = this.props;

    if (nextProps.signedIn && !this.props.signedIn) {
      getUnreadMessages();
     this.interval = setInterval(getUnreadMessages, 3000);  
    }

    if (!nextProps.signedIn && this.props.signedIn) {
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    // this.props.getUserInfo();
  }

  render() {
    // const { signedIn } = this.state;
    const { onLoadNav, loggedInNav, loggedOutNav } = this;
    const { user, signedIn, getUserInfo, logOut } = this.props;
    if (signedIn === null) {
      return onLoadNav()
    }
    if (!signedIn) {
      return loggedOutNav()
    }
    return loggedInNav()
  }
}

export default NavBar;

