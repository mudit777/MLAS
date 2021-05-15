import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Result from './components/Result/Result';
import AboutUs from './components/AboutUs/AboutUs';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path = "/home" component = {Home}/>
                <Route path = "/login" component = {Login}/>
                <Route path = "/signUp" component = {SignUp}/>
                <Route path = "/result" component = {Result}/>
                <Route path = "/aboutus" component = {AboutUs}/>
            </div>
        )
    }
}
export default Main;