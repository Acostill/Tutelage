import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';

import { Route, Link, Switch } from "react-router-dom";
import LoginUser from './components/login/LoginUser';
import RegisterUser from './components/login/RegisterUser';

class App extends Component {
  render() {
    return (
      <div>
      <nav>
        <Link to="/"> Tutelage </Link>
        {" "}
        <Link to="/login"> Log In </Link>
        {" "}
        <Link to="/register"> Register </Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginUser} />
        <Route path="/register" component={RegisterUser} />
      </Switch>
      </div>
    );
  }
}

export default App;
