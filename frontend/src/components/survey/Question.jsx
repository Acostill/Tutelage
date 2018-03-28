import React from "react";
import axios from "axios";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/users/survey", {
        answerNum: "req.body.answerNum",
        questionID: "req.body.questionID",
        userID: "req.body.userID"
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return <div>test</div>;
  }
}
export default Question;
