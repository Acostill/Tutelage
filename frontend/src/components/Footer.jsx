import React, { Component } from 'react';
import '../css/Footer.css';




class Footer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
                    <div className="footerSection">
                        <div id="copyright">Tutelage Inc.&trade; Copyright © 2018 Until Infinity</div>
                        <div id="tagline">Reach out to your full potential.&trade;</div>
                        <div>All Rights Reserved</div>
                        <div className="hqSection">
                            <div>527 Innovation Parkway, Suite 7, New York, NY 10001</div>
                        </div>
                        <div className="linkSection">
                            <div>
                                
                            <a href="https://github.com/Acostill/Tutelage">
                                <img id="githubLogo" src="./images/Octocat.png" alt="Github Repository"/>
                            </a>


                            </div>
                        </div>
                    </div>
        )
    }

}


export default Footer;