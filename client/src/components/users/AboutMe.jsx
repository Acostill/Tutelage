import React, { Component } from 'react';
import '../../css/AboutMe.css';
import Footer from '../Footer';


class AboutMe extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="tellUsAboutYourselfHeader">
                    <h1>We'd Like To Get To Know You Better!</h1>
                </div>

                <div className="aboutMeQuestionAndAnswerSection">
                    <h2>Tell Us More About Yourself.</h2>
                    <textarea name="bio" id="bio" cols="50" rows="10"></textarea><br/>
                    <button className="saveButtons" type="button">Save</button>

                    <h2>What Is Your Occupation?</h2>
                    <textarea name="occupation" id="occupation" cols="50" rows="10"></textarea><br/>
                    <button className="saveButtons" type="button">Save</button>


                    <h2>Do You Have Any Credentials?</h2>
                    <textarea name="credentials" id="credentials" cols="50" rows="10"></textarea><br/>
                    <button className="saveButtons" type="button">Save</button>


                    <h2>What Is Your Favorite Hobby?</h2>
                    <textarea name="hobbies" id="hobbies" cols="50" rows="10"></textarea><br/>
                    <button className="saveButtons" type="button">Save</button>


                    <h2>Common Interests?</h2>
                    <textarea name="interests" id="interests" cols="50" rows="10"></textarea><br/>
                    <button className="saveButtons" type="button">Save</button>
                </div>

            </div>
        )
    }
}

export default AboutMe;