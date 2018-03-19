import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';

import { Route, Link, Switch } from "react-router-dom";
import LoginUser from './components/users/login/LoginUser';

class App extends Component {
  render() {
    return (
      <div>
      <nav>
        <Link to="/"> Tutelage </Link>
        <Link to="/login">Register / Log In</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginUser} />
      </Switch>
      </div>
    );
  }
}

export default App;
