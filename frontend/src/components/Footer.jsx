import React, { Component } from 'react';
import '../css/Footer.css';




class Footer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
                    <span className="footerSection">
                        <span id="copyright">Tutelage Inc.&trade; Copyright © 2018 Until Infinity</span>
                        <span id="rights">All Rights Reserved</span>
                        <span className="hqSection">
                            <span>527 Innovation Parkway, Suite 7, New York, NY 10001</span>
                        </span>
                        <div className="linkSection">
                            <div> 
                                <a href="https://github.com/Acostill/Tutelage">
                                    <img id="githubLogo" src="./images/githubplainlogo.svg" alt="Github Repository"/>
                                </a>
                            </div>

                        </div>
                        <div id="tagline">Reach out to your full potential.&trade;</div>

                    </span>
        )
    }

}


export default Footer;