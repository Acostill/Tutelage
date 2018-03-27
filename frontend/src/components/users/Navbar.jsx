import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import './Navbar.css';
import axios from 'axios';
import Home from './components/Home';
import Profile from './Profile';
import SearchUsers from './SearchUsers';



class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            signedIn: true
        };
    }

    logOut = () => {

        axios.get(`/users/logout`)
            .then(res => {
                this.setState({
                    // redirect to home page
                    signedIn: false
                })
            })
            .catch(err => {
                this.setState({
                    message: err
                })
            })
    }


    render() {

        const { logOut } = this;

        if (!signedIn) {
            return (<Redirect to={`/`} />)
        }

        return (
            <div>
                <nav>
                    <Link id="appName" to="/"> Tutelage </Link>
                    {" "}
                    <div className="nav-right">
                        <Link to="/search"  > Search </Link>
                        {" "}
                        <Link to="/profile"  > Profile </Link>
                        {" "}
                        <button type="button" onClick={logOut}> Log Out </button>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/search" component={SearchUsers} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </div>
        );
    }
}

export default Navbar;

