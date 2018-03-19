import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";


class RegisterUser extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="registerForm">
            <fieldset>
                <legend>Register New User:</legend>
                <form>
                    <form>
                        Are you a: {" "} {" "}
                        <input type="radio" name="usertype" value="mentor" checked/>Mentor {" "} {" "}
                        <input type="radio" name="usertype" value="mentee" checked/>Mentee<br />
                    </form>

                    <br />
                        <input type="text" placeholder="First Name" name="firstname" /> <br />
                    <br />
                        <input type="text" placeholder="Last Name" name="lastname" /> <br />
                    <br />
                        <input type="email" placeholder="Email" name="email" /> <br />
                    <br />
                        <input type="password" placeholder="Password" name="password" />
                    <br />
                    <br />

                        <input type="submit" value="Create Account" />
                </form>
            </fieldset>

            <div>
                {/* Will come back for this */}
                {" "}
                <br />
                <p>Already a Member? <Link to="/login"> Log in Here </Link></p>

            </div>
                
            </div>
        )
    }


}


export default RegisterUser;