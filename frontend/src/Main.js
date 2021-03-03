import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import Login from './components/Login/Login';


class Main extends Component {
    render() {
        return (
            <div>
                <Route path = "/login" component = {Login}/>
            </div>
        )
    }
}
export default Main;