import React, { Component } from 'react';
import '../css/AboutUs.css';
import Footer from './Footer';


class AboutUs extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div className="aboutUs-container">

                <div id="missionStatementSection">
                    <h1 id="missionStatement">Mission Statement</h1>
                    <h2 className="missionParagraphs">Our mission at Tutelage is to serve as a tool to spark a connection, preferably a meaningful, mutually beneficial, long-term one between a mentor with significant experience and a mentee. Whether you are seeking to gain new skills from someone who has already travelled on the road of the journey you are just beginning, or if you are a seasoned professional seeking to give back by donating time, resources, advice and expertise to a younger version of yourself, Tutelage fosters an environment for professional life enrichment. </h2>

                    <p></p>

                    <h2 className="missionParagraphs">We enjoy when people enjoy the instruction,teaching and training they receive in conjunction with personalized coaching, guidance, nurturance, and encouragement from those they receive it from.</h2>

                    <p></p>

                    <h2 className="missionParagraphs">We specialize in creating "win-win" scenarios for both sides. The mentee recieves the crucial assistance needed to "level-up" their skills to improve their income, gain promotions that better their career trajectory, and helps them to navigate around the "potholes" of mistakes that others have encountered. The mentor, on the other hand, much more than intrinsic value, not only experiences the joys of altruism by selflessly giving to others in need, but also reinforces their own learning by way of teaching others, and may also even find themselves grooming the dream candidate that they were seeking to hire at their own business. </h2>

                    <p></p>

                    <h2 className="missionParagraphs">A Mentor is more than just a tutor. A mentor is a conduit of life transformation. The countless number of lives that have been enriched as a result of the meeting of the minds through our site and their impact on various industries is immeasurable. </h2>

                    <p></p>

                    <h2 className="missionParagraphs">Reach Out To Your Full Potential.&trade;</h2>
                </div>

                <div id="mainDiv">
                    <div className="teamMember">
                        <div className="teamMemberTitle">
                            <h2>Technical Lead</h2>
                        </div>
                        <div className="teamMemberPhoto">
                            <img src="./images/GersonCropped.jpg" alt="Tech Lead" />
                        </div>
                        <div className="teamMemberCaption">
                            <p><em><strong>"Mentorship, and by extension, "Tutelage" goes hand-in-hand. It is the act or process of imparting knowledge or skills to another. It is about not only overseeing a person's learning and  development, but it's about cultivation, preparation and nurturance."</strong></em></p>

                            <p>Gerson is a first-generation imigrant from the Dominican Republic who makes his family proud. He unashamedly prefers Android and PC's over Apple products, and enjoys watching "Avatar: The Last Airbender". Aside from being a genuinely nice guy, Gerson is a thoughtful, saavy programmer who loves to laugh and enjoys good music and is also bilingual. When Gerson is not found coding, you may potentially find him biking through the Bronx to his next destination. </p>
                                <div className="personalGithubLink">
                                    <a href="https://github.com/Acostill">
                                        <img id="githubLogo" className="gersonGithub" src="./images/githubplainlogo.svg" alt="Gerson's Github Repository"/>
                                    </a>
                                </div>
                        </div>
                    </div>


                    <div className="teamMember">
                        <div className="teamMemberTitle">
                            <h2>Product Manager</h2>
                        </div>
                        <div className="teamMemberPhoto">
                            <img src="./images/gregcropped2.jpg" alt="Product Manager" />
                        </div>
                        <div className="teamMemberCaption">
                            <p><em><strong>"To me, mentorship encompasses someone I can confide in. It means someone I can model my thinking after, look up to and aspire to be."</strong></em></p>
                            <p>Greg is a Software Engineer from Harlem, NY. When he is not failing miserably, he can usually be found grinding and hustling to reach his full potential, taking care of his beautiful family, and leading by example... all whilst browsing Stack Overflow.</p>
                                <div className="personalGithubLink">
                                    <a href="https://github.com/davisgreg1">
                                        <img id="githubLogo" className="gregGithub"src="./images/githubplainlogo.svg" alt="Greg's Github Repository"/>
                                    </a>
                                </div>
                        </div>
                    </div>


                    <div className="teamMember">
                        <div className="teamMemberTitle">
                            <h2>Design Lead</h2>
                        </div>
                        <div className="teamMemberPhoto">
                            <img src="./images/CarolinaPic2.jpeg" alt="Design Lead" />
                        </div>
                        <div className="teamMemberCaption">
                            <p><em><strong>“Mentorship is someone who can see and guide you to the best version of yourself even when you haven’t reached your fullest potential yet.”</strong></em></p>
                            <p>Carolina had a curiosity of tech since she was a teen. She wasn’t sure what she could do with tech, but Carolina did know she wanted to help others. Through her career in social services, Carolina still felt like she was missing something. After various talks with her brothers, they helped her realize that she had the capability to help others on a larger scale. Learning all these skills to be the best web developer/problem solver she could be has been the one of the greatest and most fulfilling experiences of Carolina's life. Carolina enjoys relaxing in her home state of New Jersey.</p>
                            <div className="personalGithubLink">
                                <a href="https://github.com/crestrepo12">
                                    <img id="githubLogo" className="carolinaGithub"src="./images/githubplainlogo.svg" alt="Carolina's Github Repository"/>
                                </a>
                            </div>
                        </div>
                    </div>


                    <div className="teamMember">
                        <div className="teamMemberTitle">
                            <h2>Demo Lead</h2>
                        </div>
                        <div className="teamMemberPhoto">
                            <img src="./images/EddiePic2.jpg" alt="Demo Lead" />
                        </div>
                        <div className="teamMemberCaption">
                            <p><em><strong>“Having a solid, positive mentor in one’s life can literally change a person’s view of the world and not having one can potentially even be a life or death situation. Good mentors from a young age can make all the difference in the world."</strong></em><p>

                            </p>An avid reader who also appreciates the craft of writing (both prose and programming languages), Eddie is a big kid at heart who loves basketball (the greatest sport in the world), eclectic music from all genres, and enjoys reading great, soul-stirring books (Pilgrim’s Progress, anyone?). When Eddie is not reading books, the self-described “movie buff” may be found possibly watching “Shawshank Redemption” (for the hundredth time) or roaming the streets searching for his next foodie adventure in the boroughs of New York City where he currently resides.</p>
                            <div className="personalGithubLink">
                                <a href="https://github.com/EddieHarmonJr">
                                    <img id="githubLogo" className="eddieGithub"src="./images/githubplainlogo.svg" alt="Eddie's Github Repository"/>
                                </a>
                            </div>
                        </div>
                    </div>


                    <div className="teamMember">
                        <div className="teamMemberTitle">
                            <h2>Scrum Master</h2>
                        </div>
                        <div className="teamMemberPhoto">
                            <img src="./images/NickCropped.jpg" alt="Scrum Master" />
                        </div>
                        <div className="teamMemberCaption">
                            <p><em><strong>Mentors are like guardians. They take you under their wings. It's about having guidance to a new skill or lifestyle to achieve greatness in oneself.</strong></em></p>
                            <p>Born and raised in Queens, NY, Nick can always be found playing video games. Nick has been taught to treat others with respect and to be willing to experience everything and to be unafraid to try new things. A food junkie who would rather go out and have dinner with friends and family then to participate in the nightlife party scene, Nick began to explore what the tech world had to offer.  Nick got into coding because he desired to pursue his core interests and dreamed of being in a company that focused on building video games.</p>
                            <div className="personalGithubLink">
                                <a href="https://github.com/nickst3r610">
                                    <img id="githubLogo" className="nickGithub" src="./images/githubplainlogo.svg" alt="Nick's Github Repository"/>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Why does this render a different color (pink?) */}
                    {/* <font color="#f46524ff"></font> */}




                    {/* <div class="teamPhotos">
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
                </div> */}




                </div>

                
            </div>


        )
    }

}




export default AboutUs;