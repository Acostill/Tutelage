import React, { Component } from 'react';


class AboutUs extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="mainDiv">
                <div class="teamPhotos">
                    <img width={250} height={250} src="./images/GersonCropped.jpg" alt="Tech Lead"/>
                </div>

                <div class="teamPhotos">
                    <img width={250} height={250} src="./images/gregcropped.jpg" alt="Product Manager"/>
                </div>

                <div class="teamPhotos">
                    <img width={250} height={250} src="./images/CarolinaPic.jpeg" alt="Design Lead"/>
                </div>

                <div class="teamPhotos">
                    <img width={250} height={250} src="./images/EddieCropped.jpg" alt="Demo Lead"/>
                </div>

                <div class="teamPhotos">
                <img width={250} height={250} src="./images/NickCropped.jpg" alt="Scrum Master"/>
                </div>

            </div>
        )
    }

}




export default AboutUs;