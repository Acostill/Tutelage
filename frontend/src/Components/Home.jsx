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
  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
    <li data-target="#myCarousel" data-slide-to="3"></li>
    <li data-target="#myCarousel" data-slide-to="4"></li>

  </ol>

  {/* <!-- Wrapper for slides --> */}
  <div class="carousel-inner">
    <div class="item active">
      <img src="tutelage/frontend/images/mentor1.jpg" alt="Los Angeles" />
    </div>

    <div class="item">
      <img src="mentor1.jpg" alt="Office Meeting" />
    </div>

    <div class="item">
      <img src="mentor2.jpg" alt="Coffee Shop" />
    </div>

     <div class="item">
      <img src="mentor3.jpg" alt="Group Setting" />
    </div>

     <div class="item">
      <img src="mentor4.jpg" alt="Walk and Talk" />
    </div>

     <div class="item">
      <img src="mentor5.jpg" alt="Tablet Demo" />
    </div>

        
  </div>

  {/* <!-- Left and right controls --> */}
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
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