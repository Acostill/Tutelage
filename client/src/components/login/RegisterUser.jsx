import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import "../../css/RegisterUser.css";
import Footer from "../Footer";
import Confetti from "react-confetti";

// import drawConfetti from '../../Scripts/randomFunctions'

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
      message: "",
      newUserSignedIn: false,
      showConfetti: false
    };

    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
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
        message: "* Please choose: Mentor or Mentee"
      });
      return;
    } else if (password !== passwordConfirmation) {
      this.setState({
        message: "* Passwords do not match"
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
          message: "Account Created",
          showConfetti: true
        });
        axios
          .post("/users/login", {
            username: username,
            password: password
          })
          .then(res => {
            // redirect to user's profile
            this.props.frontendRegister(this.state);
            this.setState({
              newUserSignedIn: true
            });
            this.props.appLogIn();
          })
          .catch(err => {
            console.log(err);
            this.setState({
              message: "Account Exists Already"
            });
          });
      });
  };

  drawConfetti = () => {
    // drawConfetti()
  };

  render() {
    if (this.state.newUserSignedIn) {
      console.log("hey");
      return <Redirect to="/survey" />;
    }

    const {
      firstname,
      lastname,
      email,
      username,
      password,
      passwordConfirmation,
      message,
      ismentor,
      newUserSignedIn,
      showConfetti
    } = this.state;

    console.log("window size: ", this.size);
    const { handleInputChange, handleRadioChange, registerNewUserForm } = this;

    return (
      <div id="confetti-container">
        {showConfetti ? (
          <div id="confetti">
            <Confetti {...this.size} />
          </div>
        ) : (
          ""
        )}
        <div id="registerForm">
          <fieldset id="register-container">
            <legend id="register-title">Register New User:</legend>
            <form onSubmit={registerNewUserForm} id="input-container">
              <div className="radio-button">
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
              <input
                className="input-box text-indent"
                type="text"
                placeholder="First Name"
                name="firstname"
                value={firstname}
                onChange={handleInputChange}
                required
              />
              <input
                className="input-box text-indent"
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={lastname}
                onChange={handleInputChange}
                required
              />{" "}
              <input
                className="input-box text-indent"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
              <input
                className="input-box text-indent"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleInputChange}
                minLength="6"
                maxLength="12"
                required
              />
              <input
                className="input-box text-indent"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
              />
              <input
                className="input-box text-indent"
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={handleInputChange}
                required
              />
              <div className="register-message">{message}</div>
              <input
                className="input-box createAccountButton"
                type="submit"
                value="Create Account"
              />
            </form>
          </fieldset>

          <div id="is-member-link">
            <p>
              Already a Member? <Link to="/login"> Log in Here </Link>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default RegisterUser;
