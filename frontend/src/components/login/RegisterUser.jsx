import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/RegisterUser.css";

class RegisterUser extends Component {
  constructor() {
    super();

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      ismentor: "",
      message: ""
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRadioChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  registerNewUserForm = e => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      passwordConfirmation,
      ismentor
    } = this.state;

    if (!ismentor) {
      this.setState({
        message: "Please choose if your a Mentor or Mentee"
      });
      return
    } else if (password !== passwordConfirmation) {
      this.setState({
        message: "Passwords do not match"
      });
      return;
    } else if (password === passwordConfirmation) {
      this.setState({
        message: "Passwords match"
      });
    }
      axios
        .post("/users/create", {
          firstname: firstname,
          lastname: lastname,
          email: email,
          username: username,
          password: password,
          ismentor: eval(ismentor)
        })
        .then(res => {
          this.setState({
            message: "Account Created"
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            message: "Account Exists Already"
          });
        });
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      passwordConfirmation,
      message,
      ismentor
    } = this.state;

    const { handleInputChange, handleRadioChange, registerNewUserForm } = this;

    return (
        <div>
      <div id="registerForm">
        <fieldset id="register-container">
          <legend id="register-title">Register New User:</legend>
          <form onSubmit={registerNewUserForm} id="input-container">
          <div className="radio-button" >
          Are you a: 
            <input
              type="radio"
              name="ismentor"
              value="true"
              onChange={handleRadioChange}
            />
            Mentor
            
            <input
              type="radio"
              name="ismentor"
              value="false"
              onChange={handleRadioChange}
            />
            Mentee
            </div>
            <input className="input-box text-indent"
              type="text"
              placeholder="First Name"
              name="firstname"
              value={firstname}
              onChange={handleInputChange}
              required
            />
            <input className="input-box text-indent"
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={lastname}
              onChange={handleInputChange}
              required
            />{" "}
            <input className="input-box text-indent"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
            <input className="input-box text-indent"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleInputChange}
              minLength="6"
              maxLength="12"
              required
            />
            <input className="input-box text-indent"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <input className="input-box text-indent"
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handleInputChange}
              required
            />
            {message}
            <input className="input-box" id="createAccountButton" type="submit" value="Create Account" />
          </form>
        </fieldset>

        <div id="is-member-link">
          <p>
            Already a Member? <Link to="/login"> Log in Here </Link>
          </p>
        </div>

        
      </div>

      <div class="footer">
          <p>Tutelage&trade; Copyright © 2018 Until Infinity</p>
          <p>All Rights Reserved</p>
        </div>

      </div>
    );
  }
}

export default RegisterUser;
