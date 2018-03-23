import React, { Component } from 'react';
import { Button, Carousel } from 'react-bootstrap';



class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
           
            <div>
                


  <div id="myCarousel" class="carousel slide" data-ride="carousel">

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
  <Carousel.Item class="mentorCarousel">
    <img src="./images/accountingmentor.jpg" alt="Office Meeting" />
    <Carousel.Caption>
      <h3>One-On-One</h3>
      <p>Intimate. Not Intimidating. Meet Without Distraction To Focus On What's Important.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item class="mentorCarousel">
    <img src="./images/coffeeshopmentoring.jpg" alt="Coffee Shop" />
    <Carousel.Caption>
      <h3>Shared Interests</h3>
      <p>Meet In A Manner That Is Comfortable For You. Coffee Shop? Library? Skype? The Choice Is Yours.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item class="mentorCarousel">
    <img src="./images/explaination.jpg" alt="Group Setting" />
    <Carousel.Caption>
      <h3>Time-Tested Experience</h3>
      <p>Wise And Sage Advice. Not From Novices, But Experts.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item class="mentorCarousel">
    <img src="./images/businessmentoring.jpg" alt="Walk And Talk" />
    <Carousel.Caption>
      <h3>Professional Development</h3>
      <p>Recieve The Best Professional Grooming From Industry Titans.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item class="mentorCarousel">
    <img src="./images/computermentoring.jpg" alt="Tablet Demo" />
    <Carousel.Caption>
      <h3>Hands-On Guidance</h3>
      <p>Clear, Concise Assistance To Help You Navigate Your Career Goals.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>;

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
</div>

<br />
<br />
<br />
                
                
                <div>
                    <h1 id="missionStatement">Mission Statement</h1>
                    <p className="missionParagraphs">Our mission at Tutelage is to serve as a tool to spark a connection, preferably a meaningful, mutually beneficial, long-term one between a mentor with significant experience and a mentee. Whether you are seeking to gain new skills from someone who has already travelled on the road of the journey you are just beginning, or if you are a seasoned professional seeking to give back by donating time, resources, advice and expertise to a younger version of yourself, Tutelage fosters an environment for professional life enrichment. </p>
                    <p className="missionParagraphs">We enjoy when people enjoy the instruction,teaching and training they receive in conjunction with personalized coaching, guidance, nurturance, and encouragement from those they receive it from.</p>
                    <p className="missionParagraphs">We specialize in creating "win-win" scenarios for both sides. The mentee recieves the crucial assistance needed to "level-up" their skills to improve their income, gain promotions that better their career trajectory, and helps them to navigate around the "potholes" of mistakes that others have encountered. The mentor, on the other hand, much more than intrinsic value, not only experiences the joys of altruism by selflessly giving to others in need, but also reinforces their own learning by way of teaching others, and may also even find themselves grooming the dream candidate that they were seeking to hire at their own business. </p>
                    <p className="missionParagraphs">A Mentor is more than just a tutor. A mentor is a conduit of life transformation. The countless number of lives that have been enriched as a result of the meeting of the minds through our site and their impact on various industries is immeasurable. </p>
                    <p className="missionParagraphs">Reach Out To Your Full Potential.</p>
                </div>
            </div>
        )
    }

}

export default Home;

