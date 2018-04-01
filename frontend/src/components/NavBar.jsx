import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import '../css/temp.css';
import axios from 'axios';
import Home from './Home';
// import Profile from './Profile';
import SearchUsers from './users/SearchUsers';
import { Redirect } from 'react-router';


class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: true,
      user: {}
    };
  }

  onLoadNav = () => {
    return (
      <nav id="navigation-bar">
        <Link id="app-name" to="/"> Tutelage </Link>
        {" "}
        <div className="nav-right">
          <Link to="/login"  > Log In </Link>
          {" "}
          <Link to="/register" > Register </Link>
          {" "}
          <Link to="/aboutus" > About Us </Link>
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
        {" "}
        {/* <Link to="/register" > Register </Link> */}
        {" "}
        <Link to="/aboutus" > About Us </Link>
        </div>
      </nav>
      <Redirect to={`/`} />
      </div>
    )
  }

  loggedInNav = () => {
    const { user, logOut } = this.props
    return (
      <nav id='navigation-bar'>
      <Link id="app-name" to="/"> Tutelage </Link>
      {" "}
      <div className="nav-right-loggedin">
        <Link to="/search"  > Search </Link>
        {" "}
        <Link to="/inbox"  > Messages </Link>
        {" "}
        <Link to={`/users/${user.username}`} > Profile </Link>
        {" "}
        <button type="button" id="logout-button" onClick={logOut}> Log Out </button>
      </div>
    </nav>
    ) 
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    // const { signedIn } = this.state;
    const { onLoadNav, loggedInNav, loggedOutNav } = this;
    const { user, signedIn, getUserInfo, logOut } = this.props;
    if (signedIn === null) {
      return onLoadNav()
    }
    if (!signedIn) {
      console.log('NOT SIGNED IN!')
      return loggedOutNav()
    }
    return loggedInNav()
  }
}

export default NavBar;

