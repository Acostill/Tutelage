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
import Hamburger from "./components/users/Hamburger";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      signedIn: null,
      username: "",
      password: "",
      message: "",
      unreadMessages: []
    };
  }

  getUserInfo = () => {
    axios
      .get("/users/userinfo")
      .then(res => {
        // Current
        let user = res.data.userInfo;
        let currentUser = this.state.username;
        if (!this.state.signedIn) {
          this.setState({
            signedIn: true,
            user: user
          });
        }
        // End Current
        // Incoming
        // let user = res.data.userInfo;

        axios
          .post("/users/interests", { username: user.username })
          .then(res => {
            let interests = res.data.interests;
            user = { ...user, interests: interests };
            console.log("axios user", user);
            this.setState({
              signedIn: true,
              user: user
            });
          });
        // End Incoming
      })
      .catch(err => {
        this.setState({
          signedIn: false
        });
      });
  };

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

  getUnreadMessages = () => {
    axios
      .get("/users/unread_messages")
      .then(res => {
        this.setState({
          unreadMessages: res.data.unreadMessages
        });
      })
      .catch(err => {
        this.setState({
          error: `Error Caught: ${err}`
        });
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

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    const {
      user,
      signedIn,
      username,
      password,
      message,
      unreadMessages
    } = this.state;
    const {
      getUserInfo,
      logOut,
      handleInputChange,
      submitLoginForm,
      frontendRegister,
      appLogIn,
      getUnreadMessages
    } = this;

    return (
      <div className="App">
        <NavBar
          user={user}
          signedIn={signedIn}
          getUserInfo={getUserInfo}
          logOut={logOut}
          getUnreadMessages={getUnreadMessages}
          unreadMessages={unreadMessages}
        />{" "}
        {/* <Hamburger /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/inbox"
            render={props => (
              <Inbox
                {...props}
                getUnreadMessages={getUnreadMessages}
                unreadMessages={unreadMessages}
                currentUser={user}
              />
            )}
          />
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
            render={() => <SearchUsers currentUser={user} />}
          />
          <Route path="/aboutus" render={props => <AboutUs {...props} />} />
          <Route
            path="/users"
            render={props => <Users {...props} currentUser={user} />}
          />
          <Route path="/survey" render={() => <Survey user={user} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
