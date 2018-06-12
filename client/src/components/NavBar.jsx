import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "../css/temp.css";
import axios from "axios";
import Home from "./Home";
// import Profile from './Profile';
// import SearchUsers from "./users/SearchUsers";
import { Redirect } from "react-router";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      unreadMessages: []
    }
  }

  onLoadNav = () => {
    return (
      <div className="navBar-onLoad">

        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />

            <span />
            <span />
            <span />

            <ul id="menu">
              <Link className="app-name" to="/">
                Tutelage
              </Link>
            </ul>
          </div>
        </nav>

        <nav id="navigation-bar">
          <Link className="app-name" to="/">
            {" "}
            Tutelage{" "}
          </Link>{" "}
          <div className="nav-right">Loading...</div>
        </nav>
      </div>
    );
  };

  loggedOutNav = () => {
    return (
      <div className="navBar-logOut">
        {/**REGULAR */}
        <div>
          <nav id="navigation-bar">
            <Link className="app-name" to="/">
              {" "}
              Tutelage{" "}
            </Link>{" "}
            <div className="nav-right">
              <Link to="/login"> Log In </Link>

              <Link to="/aboutus"> About Us </Link>
            </div>
          </nav>
          <Redirect to={`/`} />
        </div>
      </div>
    );
  };

  loggedInNav = () => {
    const { user, logOut, unreadMessages } = this.props;

    return (
      <div className="navBar-loggedIn">
        <nav id="navigation-bar">
          <div className="nav-left">
            <Link className="app-name" to="/">
              Tutelage
          </Link>
          </div>
          <div className='nav-mid' >
            <img id='nav-torch' src='../images/torch-greyhands.svg' />
          </div>

          <div className="nav-right-loggedin">
            {/* <div className="nav-right-items"> */}
            <Link to="/search">
              <div title="Search">
                <FontAwesomeIcon icon={["fas", "search"]} size="2x" />
              </div>
            </Link>
            <Link to="/inbox" className="inbox-link">
              <div title="Inbox">
                <FontAwesomeIcon icon={["fas", "envelope"]} size="2x" />
              </div>

              {unreadMessages.length ? (
                <div className="red">{unreadMessages.length} </div>
              ) : (
                  ""
                )}
            </Link>
            <Link to={`/users/${user.username}`}>
              <div title="Profile">
                <FontAwesomeIcon icon={["fas", "user-circle"]} size="2x" />
              </div>
            </Link>
            <Link to={`/survey`}>
              <div title="Tutelage Survey">
                <FontAwesomeIcon icon={["fas", "clipboard-list"]} size="2x" />
              </div>
            </Link>
            <button type="button" id="logout-button" onClick={logOut}>
              Log Out
            </button>
            {/* </div> */}
          </div>
        </nav>
      </div>
    );
  };

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
  // componentWillReceiveProps(nextProps) {
  //   const { getUnreadMessages } = this;

  //   if (nextProps.signedIn && !this.props.signedIn) {
  //     getUnreadMessages();
  //     this.interval = setInterval(getUnreadMessages, 3000);
  //   }
  // }

  componentDidMount() {
    let { getUserInfo, getUnreadMessages } = this.props;
    getUserInfo();
  }

  render() {
    // const { signedIn } = this.state;
    const { onLoadNav, loggedInNav, loggedOutNav } = this;
    const { user, signedIn, getUserInfo, logOut } = this.props;
    if (signedIn === null) {
      return onLoadNav();
    }
    if (!signedIn) {
      return loggedOutNav()
    }
    return loggedInNav();
  }
}

export default NavBar;
