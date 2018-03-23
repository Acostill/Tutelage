import React, { Component } from "react";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import Map from "./MapContainer";
import FilterSideBar from "./FilterSideBar";
import "../../css/SearchUsers.css";
import zipcodes from "zipcodes";

class SearchUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      zip_codes: [],
      lat_longs: []
    };
  }

  handleCardClick = e => {
    let username = e.target.value;
    console.log(e.target.value);
  };

  getUserList = () => {
    axios
      .get("/users/search")
      .then(res => {
        console.log("res.data", res.data.data);
        let zipz = res.data.data.map(elem => {
          return elem.zipcode;
        });
        this.setState({
          users: res.data.data,
          zip_codes: zipz
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  getLatLongs = () => {
    const { zip_codes } = this.state;
    let newArr = zipcodes.map((elem,idx)=>{
      let userLatLongs = zipcodes.lookup(elem)
      return userLatLongs.latitude
    })
    this.setState({
      lat_longs: newArr
    })
  }

  componentDidMount() {
    this.getUserList();
  }

  render() {
    console.log("state:", this.state);
    const { handleCardClick } = this;
    const { users, lat_longs, zip_codes } = this.state;
    const style = {
      width: "128px",
      height: "128px"
    };
    return (
      <div>
        {/* ---- Have to find a way for common saying for mentor or mentee /or props to change the title ---- */}
        <h1> Find Your Next Mentor </h1>

        <FilterSideBar />

        {users.map(user => {
          const { imgurl, firstname, lastname, username, location } = user;
          return (
            <div className="profile-card">
              <Link to={`/users/${username}`}>
                {" "}
                <img src={imgurl} alt="user_pic" style={style} />{" "}
              </Link>
              <Link to={`/users/${username}`}>
                {" "}
                <h2>{username}</h2>{" "}
              </Link>
              <h3>
                {firstname} {lastname}
              </h3>
              <p> {location} </p>
            </div>
          );
        })}
        <div className="gmap">
          <Map arrOfLatLongs={lat_longs} />
        </div>
      </div>
    );
  }
}

export default SearchUsers;
