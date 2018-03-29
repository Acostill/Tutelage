import React, { Component } from "react";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/ProfileCardList.css";

const ProfileCard = ({ user }) => {
  const { imgurl, firstname, lastname, username, location } = user;
  return (
    <div className="profile-card square">
      <Link to={`/users/${username}`}>
        <div className="sq1" />

        <div className="profile-content ">
          {" "}
          <div className="img-container">
          {/* if images do not exist, a default image will display */}
            <img src={ imgurl ? imgurl : 'https://i.imgur.com/pZ9jX8v.png'} alt="user_pic" className="img-profile-card" />{" "}
          </div>
          <div className="user-info">
            <h2 id="username">{username}</h2>{" "}
            <h3 id="firstname-lastname">
              {firstname} {lastname}
            </h3>
            <p id="location"> {location} </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProfileCard;
