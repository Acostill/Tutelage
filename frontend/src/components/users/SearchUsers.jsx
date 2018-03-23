import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/SearchUsers.css";

class SearchUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  handleCardClick = e => {
    let username = e.target.value;
    console.log(e.target.value);
  }

  getUserList = () => {
    axios
    .get("/users/search")
    .then(res => {
      console.log("res.data", res.data.data);
      this.setState({
        users: res.data.data
      });
    })
    .catch(err => {
      console.log("err", err);
    });
  }

  componentDidMount() {
    this.getUserList()
  }



  render() {
    const { handleCardClick } = this;
    const { users } = this.state;
    const style = {
      width: "128px",
      height: "128px"
    };
    return (
      <div>
        {/* ---- Have to find a way for common saying for mentor or mentee /or props to change the title ---- */}
        <h1> Find Your Next Mentor </h1>

        {users.map(user => {
          const { imgurl, firstname, lastname, username, location } = user;
          return (
            <div className='profile-card' >
              <Link to={`/users/${username}`}> <img src={imgurl} alt="user_pic" style={style} /> </Link>
              <Link to={`/users/${username}`}> <h2>{username}</h2> </Link>
              <h3>
                {firstname} {lastname}
              </h3>
              <p> {location} </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SearchUsers;