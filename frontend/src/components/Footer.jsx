import React, { Component } from 'react';
import '../css/Footer.css';




class Footer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="footerSection">
                    <p>Tutelage&trade; Copyright © 2018 Until Infinity</p>
                    <p>Reach out to your full potential.&trade;</p>
                    <p>All Rights Reserved</p>
                </div>
            </div>
        )
    }

}


export default Footer;