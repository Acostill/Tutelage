import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import AboutMe from "./components/users/AboutMe";
import LoginUser from "./components/login/LoginUser";
import RegisterUser from "./components/login/RegisterUser";
import SearchUsers from "./components/users/SearchUsers";
import Users from "./components/users/Users";
import NavBar from "./components/NavBar";
import Inbox from "./components/inbox/Inbox";
import Survey from "./components/survey/Survey";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      signedIn: null,
      username: "",
      password: "",
      message: ""
    };
  }

  getUserInfo = () => {
    axios
      .get('/users/userinfo')
      .then(res => {
        this.setState({
          signedIn: true,
          user: res.data.userInfo
        })
      })
      .catch(err => {
        this.setState({
          signedIn: false
        })
      })
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitLoginForm = e => {
    e.preventDefault();
    const { username, password, message } = this.state;
    axios
      .post("/users/login", {
        username: username,
        password: password
      })
      .then(res => {
        // redirect to user's profile
        this.setState({
          signedIn: true,
          user: res.data,
          username: "",
          password: "",
          message: ""
        });
      })
      .catch(err => {
        if (username === "" && password === "") {
          this.setState({
            message: "* Fill out Username & Password"
          });
        } else {
          this.setState({
            username: "",
            password: "",
            message: "* Username / Password Incorrect"
          });
        }
      });
  };

  frontendRegister = user => {
    this.setState({
      user: { username: user.username }
    });
  };

  appLogIn = () => {
    this.setState({
      signedIn: true
    });
  };

  logOut = () => {
    axios
      .get(`/users/logout`)
      .then(res => {
        this.setState({
          // redirect to home page
          signedIn: false,
          user: { username: null }
        });
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  };

  render() {
    const { user, signedIn, username, password, message } = this.state;
    const {
      getUserInfo,
      logOut,
      handleInputChange,
      submitLoginForm,
      frontendRegister,
      appLogIn
    } = this;

    return (
      <div className="App">
        <NavBar
          user={user}
          signedIn={signedIn}
          getUserInfo={getUserInfo}
          logOut={logOut}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/inbox" component={Inbox} />
          <Route
            path="/login"
            render={() => (
              <LoginUser
                handleInputChange={handleInputChange}
                submitLoginForm={submitLoginForm}
                user={user}
                username={username}
                password={password}
                message={message}
                signedIn={signedIn}
              />
            )}
          />
          <Route
            path="/register"
            render={() => {
              return (
                <RegisterUser
                  frontendRegister={frontendRegister}
                  appLogIn={appLogIn}
                />
              );
            }}
          />
          <Route
            path="/search"
            component={() => <SearchUsers currentUser={user} />}
          />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/users" component={() => <Users user={user} />} />
          {/* <Route path="/aboutMe" component={AboutMe} /> */}
          <Route path="/survey" component={() => <Survey user={user} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
