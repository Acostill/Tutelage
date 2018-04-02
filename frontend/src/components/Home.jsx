import React, { Component } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Ally } from '..//Scripts/randomFunctions'
import '../css/Home.css';



class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <div>

      <div id="myCarousel" className="carousel slide" data-ride="carousel">

        {/* <!-- Indicators --> */}
        {/* <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
    <li data-target="#myCarousel" data-slide-to="3"></li>
    <li data-target="#myCarousel" data-slide-to="4"></li>

  </ol> */}

        {/* <!-- Wrapper for slides --> */}
        <Carousel>
          <Carousel.Item className="mentorCarousel">
            <img className="carouselImage" src="./images/accountingmentor.jpg" alt="Office Meeting" />
            <Carousel.Caption>
              <h1 className="captionOne">One-On-One</h1>
              <h2 className="captionTwo">Intimate. Not Intimidating. Meet Without Distraction To Focus On What's Important.</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="mentorCarousel">
            <img className="carouselImage" src="./images/coffeeshopmentoring.jpg" alt="Coffee Shop" />
            <Carousel.Caption>
              <h1 className="captionOne">Shared Interests</h1>
              <h2 className="captionTwo">Meet In A Manner That Is Comfortable For You. Coffee Shop? Library? Skype? The Choice Is Yours.</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="mentorCarousel">
            <img className="carouselImage" src="./images/explaination.jpg" alt="Group Setting" />
            <Carousel.Caption>
              <h1 className="captionOne">Time-Tested Experience</h1>
              <h2 className="captionTwo">Wise And Sage Advice. Not From Novices, But Experts.</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="mentorCarousel">
            <img className="carouselImage" src="./images/businessmentoring.jpg" alt="Walk And Talk" />
            <Carousel.Caption>
              <h1 className="captionOne">Professional Development</h1>
              <h2 className="captionTwo">Recieve The Best Professional Grooming From Industry Titans.</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="mentorCarousel">
            <img className="carouselImage" src="./images/computermentoring.jpg" alt="Tablet Demo" />
            <Carousel.Caption>
              <h1 className="captionOne">Hands-On Guidance</h1>
              <h2 className="captionTwo">Clear, Concise Assistance To Help You Navigate Your Career Goals.</h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* <div class="carousel-inner">
    <div class="item active">
      <img src="https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg" alt="Los Angeles" />
    </div>

    <div class="item">
      <img src="http://r.ddmcdn.com/w_830/s_f/o_1/cx_20/cy_1463/cw_2528/ch_1422/APL/uploads/2014/11/puppy-cam-veer-2893191.jpg" alt="Office Meeting" />
    </div>

    <div class="item">
      <img src="http://dynaimage.cdn.turner.com/gns/gns/e_trim/180213130413-westminster-dog-show-5.jpg" alt="Coffee Shop" />
    </div>

     <div class="item">
      <img src="http://www.mamawantsthis.com/wp-content/uploads/2017/06/pexels-photo-67660.jpeg" alt="Group Setting" />
    </div>

     <div class="item">
      <img src="http://dogsaholic.com/wp-content/uploads/2015/05/Puppy-exercise-and-play-with-ball.jpg" alt="Walk and Talk" />
    </div>

     <div class="item">
      <img src="https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg" alt="Tablet Demo" />
    </div>

        
  </div> */}

        {/* <!-- Left and right controls --> */}
        {/* <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a> */}
        {/* </div> */}


        <div id="signUpChoice">
          <div id="mentorButton">
          <Link to="/register" ><button className="buttons" type="button">Become A Mentor</button></Link>
              <h3 className="signUpEnticers">Make A Significant Impact</h3>
            </div>
          <div id="menteeButton">
          <Link to="/register" ><button className="buttons" type="button">Become A Mentee</button></Link>
              <h3 className="signUpEnticers">Get Expert Career Guidance</h3>
            </div>
            
        </div>



      </div>
    )
  }

}

export default Home;

