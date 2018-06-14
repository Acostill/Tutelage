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
        console.err(err);
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
        this.setState({
          user: res.data.userInfo,
          userID: res.data.userInfo.id
        });
      })
    .catch(err => {
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/users/survey", {
        answers: this.state.answers
      })
      .then(function(response) {
      })
      .catch(function(error) {
        console.err("HANDLESUBMIT Error", error);
      });

    this.setState({
      submitted: !this.state.submmitted
    });
  };

  componentDidMount() {
    this.getSurvey();
    this.getUserInfo();
  }

  render() {
    const { questions, questionid, submitted } = this.state;
    const user = this.props.user;

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
