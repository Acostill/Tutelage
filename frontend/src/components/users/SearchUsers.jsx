import React, { Component } from "react";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import Map from "./MapContainer";
import FilterSideBar from "./FilterSideBar";
import "../../css/SearchUsers.css";
import zipcodes from "zipcodes";
import ProfileCard from "./ProfileCard";
import Swal from 'sweetalert2';

class SearchUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      stolenUsers: [],
      tutelegeUserList: [],
      zip_codes: [],
      lat_longs: [],
      message: "",
      isFiltering: false
    };
  }

  handleCardClick = e => {
    let username = e.target.value;
  };

  getBestUsers = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { isFiltering, tutelegeUserList } = this.state;
    const { currentUser } = this.props;
    let theUsers = [];
    axios
      .get("/users/magic")
      .then(res => {
        console.log("REZZY AGIAN", res)
        if(res.data.data.length > 0){
          res.data.data.map(elem => {
            axios
              .post("/users/getUserById", {
                id: elem.matches
              })
              .then(res => {
                theUsers.push(res.data.userInfo)
                this.setState({
                  tutelegeUserList: theUsers,
                  isFiltering: !this.state.isFiltering
                });
              })
              .catch(error => {
                console.log("Error getting user by ID:", error);
              })
          })
        } else {
          Swal({
            title: `Hey ${currentUser.firstname}, go complete our survey to find your special Tutelage Match!`,
            width: 600,
            padding: 100,
            background: `#fff`,
            confirmButtonText: `OK`,
            confirmButtonColor: `#FD8F26`
          })
        }
      })
      .catch(err => {
        console.log("The getBestUsers ", err);
      });
  };

  getUserList = () => {
    axios
      .get("/users/search")
      .then(res => {
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
    const { handleCardClick, stealUsers } = this;
    const {
      stolenUsers,
      users,
      lat_longs,
      zip_codes,
      getBestUsers,
      tutelegeUserList,
      isFiltering
    } = this.state;
    const { currentUser } = this.props;
    console.log("current:", currentUser)
    const style = {
      width: "200px",
      height: "200px"
    };
    return (
      <div id="search-page">
        {this.props.currentUser.ismentor ? (
          <div id="search-header" className="font-large">
            {" "}
            Find Your Next Mentee{" "}
          </div>
        ) : (
          <div id="search-header" className="font-large">
            {" "}
            Find Your Next Mentor{" "}
          </div>
        )}

        <div id="filter-results-map">
          <FilterSideBar
            id="filter-sidebar"
            currentUser={currentUser}
            handleSubmit={this.getBestUsers}
          />

          <div id="results-map">
            {!isFiltering ? (
              <div id="search-results">
                {users.map(user => <ProfileCard user={user} />)}
              </div>
            ) : (
              <div id="search-results">
                {tutelegeUserList.map(user => <ProfileCard user={user} />)}
              </div>
            )}

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
