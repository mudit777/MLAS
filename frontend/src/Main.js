import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';


class Main extends Component {
    render() {
        return (
            <div>
                <Route path = "/home" component = {Home}/>
                <Route path = "/login" component = {Login}/>
                <Route path = "/signUp" component = {SignUp}/>
            </div>
        )
    }
}
export default Main;