import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../NavBar";
import "../../css/hamburger.css";

class Hamburger extends React.Component {
  //   showSettings (event) {
  //     event.preventDefault();
  //     .
  //     .
  //     .
  //   }

  render() {
    const { link, id, class_name, textToPut } = this.props;
    return (
      <div>
        <Menu left>
          {/* <a id="sidebar" className="my-menu" href="/">Home</a> */}
        <div>hey</div>
        </Menu>
 
      </div>
    );
  }
}
export default Hamburger;