import React from 'react';
import axios from 'axios';

class RandomUser extends React.Component {
    constructor (){
        super()
        this.state = {
            users: []
        }
    }

    getTheFuckingUser = () => {
        fetch('https://randomuser.me/api/?results=50')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                users: data
            })
          })
    }
    componentDidMount(){
        this.getTheFuckingUser()
    }
    render(){
        console.log("the state", this.state)
        return(
            <div>

                check the console.
            </div>
        )
    }
}
export default RandomUser;
