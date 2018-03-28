import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";

import InlineRadioGroup from "./InlineRadio";
import axios from "axios";
import "../../css/Survey.css";

class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      user: "",
      questionid: "",
      questions: [],
      submitted: false
    };
  }

  getSurvey = () => {
    console.log("Component Mounted.")
    const {
      questions
    } = this.state;

    let survey_questions = [];

    axios
      .get("/users/survey")
      .then(res => {
        res.data.data.map(elem => {
          survey_questions.push(elem);
        });

        this.setState({
          questions: survey_questions
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleRadioButtonChange = e => {
   /**  console.log("VALUEE [that needs to be a number]:", e.target.value);
      * console.log("QUESTION ID:", e.target.name);
      * console.log("USER IDDD is:", this.state.user.id)
      *              answerBody: e.target.value (this gives the actual answer text) 
     *                  questionID: e.target.name
     * 
    */
    const {
      user,
      answers,
      questionid,
      questions
    } = this.state;

      let answerObj = {
        answer_selection: e.target.value,
        question_id: parseInt(e.target.name),
        user_id: parseInt(this.props.user.id)
      }

    this.setState({
      [e.target.name]: e.target.value,
      answers: [...this.state.answers, answerObj]
    });
  };

  getUserInfo = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      this.setState({ user: JSON.parse(loggedInUser) });
      return;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("THE STATE:", this.state)
    axios
      .post("/users/survey", {
        answers: this.state.answers
      })
      .then(function(response) {
        console.log("Response:",response);
      })
      .catch(function(error) {
        console.log(error);
      });
      
      this.setState({
        submitted: !this.state.submmitted
      })
  };

  componentDidMount() {
    console.log("Component about to Mount");
    this.getSurvey();
    // this.getUserInfo();
  }

  render() {
    console.log("PROPZZZZ:", this.props)
    console.log("Component Mounted here first in the Render:", this.state);
    const { questions, questionid, submitted } = this.state;
    const { user } = this.props;

    if (submitted) {
      return( 
      <Redirect to= {`/users/${user.username}`}/>)
    }
    return (
      <form className="survey-form" onSubmit={this.handleSubmit}>
        <div id="questions">
          <p id="questionsPTag">
            {questions.map((question, idx) => (
              <p className="question-card">
                <h1>
                  {question.the_question}
                  <fieldset>
                    <legend>Choose one to find a match!</legend>
                    <InlineRadioGroup
                      className="questionChoice"
                      name={`${question.id}`}
                      values={[
                        question.answer_1,
                        question.answer_2,
                        question.answer_3,
                        question.answer_4
                      ]}
                      handleSelect={this.handleRadioButtonChange}
                    />
                  </fieldset>
                </h1>
              </p>
            ))}
          </p>
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default Survey;
