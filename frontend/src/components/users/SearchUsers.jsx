import React, { Component } from "react";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import Map from "./MapContainer";
import FilterSideBar from "./FilterSideBar";
import "../../css/SearchUsers.css";
import zipcodes from "zipcodes";
import ProfileCard from './ProfileCard';

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
    let newArr = zipcodes.map((elem, idx) => {
      let userLatLongs = zipcodes.lookup(elem);
      return userLatLongs.latitude;
    });
    this.setState({
      lat_longs: newArr
    });
  };

  componentDidMount() {
    this.getUserList();
  }

  render() {
    console.log("CURRENT USER PROP?", this.props)
    console.log("state:", this.state);
    console.log("USER TO SEE IF MENTEE", this.state.users)
    console.log("IS MENTOR?!!!!!!!!!", this.props.currentUser.ismentor)
    const { handleCardClick } = this;
    const { users, lat_longs, zip_codes } = this.state;
    const { currentUser } = this.props;
    const style = {
      width: "200px",
      height: "200px"
    };
    return (
      <div id="search-page">
        {this.props.currentUser.ismentor
          ?  (<div id="search-header" className="font-large"> Find Your Next Mentee </div>) 
          :  (<div id="search-header" className="font-large"> Find Your Next Mentor </div>)}

        <div id="filter-results-map">
          <FilterSideBar id="filter-sidebar" />

          <div id="results-map">
            <div id="search-results">
              {users.map(user => <ProfileCard user={user} />)}
            </div>

            {/* <div className="gmap">
              <Map arrOfLatLongs={lat_longs} />
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchUsers;
