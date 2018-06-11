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
      userID: "",
      questionid: "",
      questions: [],
      submitted: false
    };
  }

  getSurvey = () => {
    console.log("Component Mounted.");
    const { questions } = this.state;

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
    console.log("userNAMEMEMEME", this.props.user.username);
    const { user, userID, answers, questionid, questions } = this.state;

    let answerObj = {
      answer_selection: e.target.value,
      question_id: parseInt(e.target.name),
      username: this.props.user.username,
      user_id: userID
    };

    this.setState({
      [e.target.name]: e.target.value,
      answers: [...this.state.answers, answerObj]
    });
  };

  getUserInfo = () => {
    axios
      .get("/users/userinfo")
      .then(res => {
        console.log("IS ID HERE?", res.data.userInfo);
        this.setState({
          user: res.data.userInfo,
          userID: res.data.userInfo.id
        });
      })
    .catch(err => {
      console.log("GET USER INFO ERROR", err);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("THE STATE:", this.state);
    console.log("the user", this.props.user);
    axios
      .post("/users/survey", {
        answers: this.state.answers
      })
      .then(function(response) {
        console.log("Response:", response);
      })
      .catch(function(error) {
        console.log("HANDLESUBMIT Error", error);
      });

    this.setState({
      submitted: !this.state.submmitted
    });
  };

  componentDidMount() {
    console.log("Component about to Mount");
    this.getSurvey();
    this.getUserInfo();
  }

  render() {
    console.log("PROPZZZZ:", this.props);
    console.log(
      "Component Mounted here first in the Render IN SURVEYY:",
      this.state
    );
    const { questions, questionid, submitted } = this.state;
    const user = this.props.user;
    console.log("userrr", user);

    if (submitted) {
      return <Redirect to={`/users/${user.username}`} />;
    }

    return (
      <form className="survey-form" onSubmit={this.handleSubmit}>
        <h1 id="survey-title">
          <strong>Let's Help You Make A Match </strong>
        </h1>
        <div id="questions">
          {questions.map((question, idx) => (
            <div className="question-card">
           
              <h1 className="the-question" > {question.the_question} </h1>
             
              <legend></legend>
              <fieldset>
                <InlineRadioGroup
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
            </div>
          ))}
        </div>
        <input type="submit" value="Submit" className="button-size submit" />
      </form>
    );
  }
}
export default Survey;
