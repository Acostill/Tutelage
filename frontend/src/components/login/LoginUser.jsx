import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/LoginUser.css";

class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: "",
      signedIn: false
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitLoginForm = e => {
    const { username, password, message } = this.state;
    axios
      .post("/users/login", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res);
        this.props.user(res.data);
        this.props.active();
        this.setState({
            signedIn: true
        })
      })
      .catch(err => {
        console.log(err);
        if(username === "" && password === ""){
          this.setState({
            message: "Fill out Username & Password"
          })
        } else {   
          this.setState({
            username: "",
            password: "",
            message: "Username / Password Incorrect"
          });
        }
      });
  };

  render() {
    const { username, password, message } = this.state;
    const { handleInput, submitLoginForm } = this;
    return (
      <div>
        <div>
          <h1> Welcome Back! </h1>
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleInput}
            placeholder="Username"
            className="input-box"
          />
          <br />
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleInput}
            placeholder="Password"
            className="input-box"
          />
          <br />
          <button onClick={submitLoginForm}>
            Log in
          </button>
    
          {message}
          
        </div>

        <div>
          <p>
            {" "}
            Not a member? <Link to="/register"> Register here. </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default LoginUser;
