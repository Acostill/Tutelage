import React, { Component } from "react";
import axios from "axios";
import "../../css/EditProfile.css";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            userMessage: "",
            newGender: null,
            newZipcode: null,
            newOccupation: null,
            newImgURL: null,
            newBio: null,
            newFirstName: null,
            newLastName: null
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

    handleTextArea = e => {
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

//      axios
//       .patch('/users/updateUser', {
//         newFirstName: newFirstName,
//         newLastName: newLastName,
//         newGender: newGender,
//         newBio: newBio,
//         newImgURL: newImgURL,
//         newOccupation: newOccupation,
//         newZipcode: newZipcode
//       })
//       .then(res => {
//         this.setState({
//           message: 'User Profile updated!'
//         })
//       })
//       .catch(e => {
//         console.log(e)
//         this.setState({
//           message: 'Error updating profile'
//         })
//       })
//   }


    render() {
        const { user, userMessage, newFirstName, newLastName, newGender, newZipcode, newBio, newOccupation, newImgURL } = this.state;
        console.log({ user });
        const { clearMessage, handleTextArea, handleInputChange, handleRadioChange, editProfileSubmitForm } = this;

        let Interests = "";

        return (
        


            <div id="user-profile" className="margin">
                <form onSubmit={editProfileSubmitForm} id="input-container">
                    <div className="background-banner">

                        <div id="user-banner">
                            <div className="image-crop margin">
                                <img src={user.imgurl} alt="profile picture" className="img" />
                            </div>
                            <div id="user-basic-info">
                                <h1 className="user-header">
                                    {`${user.firstname} ${user.lastname}`}
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        name="firstname"
                                        value={newFirstName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastname"
                                        value={newLastName}
                                        onChange={handleInputChange}
                                    />
                                </h1>
                                <h3> Gender: {user.gender} </h3>
                                <h3> Zipcode: {user.zipcode} </h3>
                                <h3> Occupation: {user.occupation} </h3>
                                <input
                                 type="text" 
                                 name="imgURL" 
                                 placeholder="Link of Image"
                                 value={newImgURL}
                                 onChange={handleInputChange}
                                 />
                            </div>
                        </div>
                    </div>

                    <div className="user-info-content">
                        <div id="quick-user-info" className="margin-top">
                            <div> Zipcode: {user.zipcode} </div>
                            <input
                                type="text"
                                placeholder="Zipcode"
                                name="zipcode"
                                value={newZipcode}
                                onChange={handleInputChange}
                            />
                            <div> Gender: {user.gender}
                                < br />
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={handleRadioChange}
                                />
                                {" "}Male {" "}
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={handleRadioChange}
                                />

                                {" "}Female </div>
                            <div> Occupation: {user.occupation} </div>
                            <input
                                type="text"
                                placeholder="Occupation"
                                name="occupation"
                                value={newOccupation}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="margin-top">
                            Interests: {Interests} </div>
                        <div className="margin-top"> Bio: {user.bio} </div>
                        <input
                            type="text"
                            placeholder="Bio"
                            name="bio"
                            value={newBio}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input type="submit" />

                </form>
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
                            onChange={handleTextArea}
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

export default EditProfile;

