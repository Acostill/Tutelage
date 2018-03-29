import React, { Component } from "react";
import axios from "axios";
import "../../css/EditProfile.css";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            userMessage: ""
        };
    }

    getUser = () => {
        let username = this.props.match.params.username;
        console.log({ username });
        axios
            .get(`/users/getuser/${username}`)
            .then(res => {
                let user = res.data.user;
                this.setState({
                    user: user
                });
            })
            .catch(err => {
                this.setState({
                    message: err
                });
            });
    };

    componentDidMount() {
        this.getUser();
    }

    handleTextarea = e => {
        this.setState({
            userMessage: e.target.value
        });
    };

    clearMessage = () => {
        this.setState({
            userMessage: ""
        });
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleRadioChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };

    render() {
        const { user, userMessage } = this.state;
        console.log({ user });
        const { clearMessage, handleTextarea, handleInputChange, handleRadioChange } = this;

        let commonInterests = "";

        return (
            <div id="user-profile" className="margin">
                <div className="background-banner">
                    <div id="user-banner">
                        <div className="image-crop margin">
                            <img src={user.imgurl} alt="profile picture" className="img" />
                            <input type="file" name="pic" accept="image/*" />
                        </div>
                        <div id="user-basic-info">
                            <h1 className="user-header">
                                {`${user.firstname} ${user.lastname}`}
                            </h1>
                            <h3> Gender: {user.gender} </h3>
                            <h3> Location: {user.location} </h3>
                            <h3> Occupation: {user.occupation} </h3>
                        </div>
                    </div>
                </div>

                <div className="user-info-content">
                    <div id="quick-user-info" className="margin-top">
                        <div> Location: {user.location} </div>
                        <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={location}
                            onChange={handleInputChange}
                        />
                        <div> Gender: {user.gender} </div>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={handleRadioChange}
                        />
                        Male
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={handleRadioChange}
                        />
                        Female
                        <div> Occupation: {user.occupation} </div>
                        <input
                            type="text"
                            placeholder="Occupation"
                            name="occupation"
                            value={occupation}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="margin-top">
                        Common Interests: {commonInterests}
                        <input
                            type="text"
                            placeholder="Common Interests"
                            name="commonInterests"
                            value={commonInterests}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="margin-top"> Hobbies: {user.hobbies} </div>
                    <input
                            type="text"
                            placeholder="Hobbies"
                            name="hobbies"
                            value={hobbies}
                            onChange={handleInputChange}
                        />
                    <div className="margin-top"> Bio: {user.bio} </div>
                    <input
                            type="text"
                            placeholder="Bio"
                            name="bio"
                            value={bio}
                            onChange={handleInputChange}
                        />
                    <div className="margin-top"> Credentials: {user.credentials} </div>
                    <input
                            type="text"
                            placeholder="Credentials"
                            name="credentials"
                            value={credentials}
                            onChange={handleInputChange}
                        />
                </div>

                <div className="background-banner orange-background">
                    <div id="chat-box" className="margin-top">
                        <label>
                            <h2> Let's chat: </h2>
                        </label>
                        <textarea
                            name="message"
                            id="message-box"
                            cols="30"
                            rows="5"
                            placeholder="Write your message here ..."
                            value={userMessage}
                            onChange={handleTextarea}
                        />
                        <div className="chat-buttons">
                            <input
                                type="submit"
                                value="Submit Message"
                                className="submit button-size"
                            />
                            <button className="clear button-size" onClick={clearMessage}>
                                {" "}
                                Clear{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;

