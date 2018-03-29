import React, { Component } from "react";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/ProfileCardList.css";

const ProfileCard = ({ user }) => {
    const {
        imgurl,
        firstname,
        lastname,
        username,
        location
      } = user;
    return (
        <div className="profile-card horizontal">
          <div className="profile-content">
            <Link to={`/users/${username}`}>
              {" "}
              <div className="img-container">
                <img src={imgurl} alt="user_pic" className="img-profile-card" />{" "}
              </div>
            </Link>
            <div className="user-info">
              <Link to={`/users/${username}`}>
                {" "}
                <h2 id="username">{username}</h2>{" "}
              </Link>
              <h3 id="firstname-lastname">
                {firstname} {lastname}
              </h3>
              <p id="location"> {location} </p>
            </div>
          </div>
        </div>
    )
}

export default ProfileCard;
