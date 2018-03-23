import React, { Component } from "react";
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

  componentDidMount() {
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

  render() {
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
          const { imgurl, firstname, lastname } = user;
          return (
            <div>
              <img src={imgurl} alt="user_pic" style={style} />
              <h3>
                {firstname} {lastname}
              </h3>
              <p> Manhattan, NY </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SearchUsers;