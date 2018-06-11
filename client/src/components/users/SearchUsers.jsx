import React, { Component } from "react";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import Map from "./MapContainer";
import FilterSideBar from "./FilterSideBar";
import "../../css/SearchUsers.css";
import zipcodes from "zipcodes";
import ProfileCard from "./ProfileCard";
import Swal from "sweetalert2";

class SearchUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      allMentors: [],
      filteredMentors: [],
      allMentees: [],
      filteredMentees: [],
      tutelegeUserList: [],
      tutMentors: [],
      tutMentees: [],
      zip_codes: [],
      lat_longs: [],
      message: "",
      isFiltering: false,
    };
  }

  handleCardClick = e => {
    let username = e.target.value;
  };

  getBestUsers = e => {
    e.stopPropagation();
    e.preventDefault();
    const {
      isFiltering,
      tutelegeUserList,
      tutMentors,
      tutMentees
    } = this.state;
    const { currentUser } = this.props;
    let theUsers = [];
    axios
      .get("/users/magic")
      .then(res => {
        if (res.data.data.length > 0) {
          res.data.data.map(elem => {
            axios
              .post("/users/getUserById", {
                id: elem.matches
              })
              .then(res => {
                theUsers.push(res.data.userInfo);
                let tutMentors = theUsers.filter(elem => {
                  return elem.ismentor;
                });
                let tutMentees = theUsers.filter(elem => {
                  return !elem.ismentor;
                });
                this.setState({
                  tutMentors: tutMentors,
                  tutMentees: tutMentees,
                  tutelegeUserList: theUsers,
                  isFiltering: !this.state.isFiltering
                });
              })
              .catch(error => {
                console.log("Error getting user by ID:", error);
              });
          });
        } else {
          Swal({
            title: `Hey ${
              currentUser.firstname
            }, did you fill out the survey? 🤔 Try again later for a Tutelage Match. Alternatively, use our filter below!`,
            width: 600,
            padding: 100,
            background: `#fff`,
            confirmButtonText: `OK`,
            confirmButtonColor: `#FD8F26`
          });
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
        let allMentors = res.data.data.filter(elem => {
          return elem.ismentor;
        });
        let allMentees = res.data.data.filter(elem => {
          return !elem.ismentor;
        });
        this.setState({
          users: res.data.data,
          allMentees: allMentees,
          filteredMentees: allMentees,
          allMentors: allMentors,
          filteredMentors: allMentors,
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

  filterBy = ( gender, ageGroup, expertise, language ) => {
    const filteredMentees = this.state.allMentees.filter( user => {
       if( !gender ) {
        return user;
       } else if ( gender ) {
         return user.gender.toLowerCase() === gender.toLowerCase();
       } 
      } )

    const filteredMentors = this.state.allMentors.filter( user => {
      if( !gender ) {
        return user;
      } else if ( gender ) {
        return user.gender.toLowerCase() === gender.toLowerCase();
      }
    })

    this.setState({
      filteredMentees: filteredMentees,
      filteredMentors: filteredMentors,
    })
  }

  render() {
    const { handleCardClick, stealUsers } = this;
    const {
      users,
      allMentors,
      filteredMentors,
      allMentees,
      filteredMentees,
      tutMentors,
      tutMentees,
      lat_longs,
      zip_codes,
      getBestUsers,
      tutelegeUserList,
      isFiltering
    } = this.state;
    const { currentUser } = this.props;

    const style = {
      width: "200px",
      height: "200px"
    };
    return (
      <div className="search-container">
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
            // handleGenderSelect={this.getGender}
            handleSelect={this.filterBy}
          />

          <div id="results-map">
            {!isFiltering ? (
              <div id="search-results">
                {this.props.currentUser.ismentor
                  ? filteredMentees.map(user => <ProfileCard user={user} />)
                  : filteredMentors.map(user => <ProfileCard user={user} />)}
              </div>
            ) : (
              <div id="search-results">
                {this.props.currentUser.ismentor
                  ? tutMentees.map(user => <ProfileCard user={user} />)
                  : tutMentors.map(user => <ProfileCard user={user} />)}
              </div>
            )}

            {/* <div className="gmap">
              <Map arrOfLatLongs={lat_longs} />
            </div> */}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default SearchUsers;
