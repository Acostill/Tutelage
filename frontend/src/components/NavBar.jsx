import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import '../css/Navbar.css';
import axios from 'axios';
import Home from './Home';
// import Profile from './Profile';
import SearchUsers from './users/SearchUsers';
import { Redirect } from 'react-router';


class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: true
    };
  }

  logOut = () => {

    axios.get(`/users/logout`)
      .then(res => {
        this.setState({
          // redirect to home page
          signedIn: false
        })
      })
      .catch(err => {
        this.setState({
          message: err
        })
      })
  }


  render() {
    const { signedIn } = this.state;
    const { logOut } = this;

    if (!signedIn) {
      return (<Redirect to={`/`} />)
    }

    return (
      <div>
        {/* ---------- Nicks's Nav Bar Below ---------- */}
        {/* <nav>
          <Link id="appName" to="/"> Tutelage </Link>
          {" "}
          <div className="nav-right">
            <Link to="/search"  > Search </Link>
            {" "}
            <Link to="/profile"  > Profile </Link>
            {" "}
            <button type="button" onClick={logOut}> Log Out </button>
          </div>
        </nav> */}
        {/* ----- End of Nick's Nav Bar ----- */}


        {/* ---------- Current App.js Nav Bar Below ---------- */}
        {/* <nav id="navigation-bar">
        <Link id="app-name" to="/"> Tutelage </Link>
        {" "}
        <div className="nav-right">
        <Link to="/login"  > Log In </Link>
        {" "}
        <Link to="/register" > Register </Link>
        {" "}
        <Link to="/aboutus" > About Us </Link>
        </div>
        </nav> */}
        {/* ----- End of Current App.js Nav Bar ----- */}
      </div>
    );
  }
}

export default Navbar;

