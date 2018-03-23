import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";

class RegisterUser extends React.Component {

    state = {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      ismentor: "",
      message: ""
    };
  
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
          // passwordConfirmation: passwordConfirmation,
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
      <div id="registerForm">
        <fieldset>
          <legend>Register New User:</legend>
          <form onSubmit={registerNewUserForm}>
            Are you a:{" "}
            <input
              type="radio"
              name="ismentor"
              value="true"
              onChange={handleRadioChange}
            />
            Mentor{" "}
            <input
              type="radio"
              name="ismentor"
              value="false"
              onChange={handleRadioChange}
            />{" "}
            Mentee
            <br />
            <br />
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={firstname}
              onChange={handleInputChange}
              required
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={lastname}
              onChange={handleInputChange}
              required
            />{" "}
            <br />
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleInputChange}
              minLength="6"
              maxLength="12"
              required
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handleInputChange}
              required
            />
            <br />
            <br />
            {message}
            <br />
            <input type="submit" value="Create Account" />
          </form>
        </fieldset>

        <div>
        <br />
          <p>
            Already a Member? <Link to="/login"> Log in Here </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
