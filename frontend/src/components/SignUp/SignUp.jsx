import React, { Component } from 'react';
import AppleLogin from 'react-apple-login';
import FacebookLogin from 'react-facebook-login';
import {Button, Input, Form, Row, Col, Select, notification, Space} from 'antd';
import { GoogleLogin } from 'react-google-login';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './SignUp.css'
import 'antd/dist/antd.css';
import {BACKEND} from '../../Config'
 
const { Option } = Select;
const days = []
for (let i = 0; i < 31; i++) {
    days.push(<Option key={i}>{i}</Option>);
}

const months = []
months.push(<Option key ={'January'}>January</Option>)
months.push(<Option key ={'February'}>February</Option>)
months.push(<Option key ={'March'}>March</Option>)
months.push(<Option key ={'April'}>April</Option>)
months.push(<Option key ={'May'}>May</Option>)
months.push(<Option key ={'June'}>June</Option>)
months.push(<Option key ={'July'}>July</Option>)
months.push(<Option key ={'August'}>August</Option>)
months.push(<Option key ={'September'}>September</Option>)
months.push(<Option key ={'October'}>October</Option>)
months.push(<Option key ={'November'}>November</Option>)
months.push(<Option key ={'December'}>December</Option>)

const years= []
for (let i = 1950; i < 2020; i++) {
    years.push(<Option key={i}>{i}</Option>);
}

class SignUp extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            day: "",
            month : "",
            year : ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount = () => {
    }
    onDayChange = (value) => {
        this.setState({
            day : value
        });
    } 
    onMonthChange = (value) => {
        this.setState({
            month : value
        });
    }
    onYearChange = (value) =>{
        this.setState({
            year : value
        });
    }
    handleSubmit = () => {
        var headers = new Headers();
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;
        var allFilled = false
        if(firstName === "" || lastName === "" || password === "" || email === "")
        {
            // NotificationManager.error("Error" , "Please field all values")
            notification["error"]({
                message: 'Empty Fields',
                description:
                  'Please complete all the fields',
              });
        }
        else{
            allFilled = true;
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValidEmail =  re.test(String(email).toLowerCase());
        if(!isValidEmail) 
        {
            notification["error"]({
                message: 'Invalid Email',
                description:
                  'Please enter a valid email address',
              });
        }
        if(isValidEmail && allFilled) 
        {
            var user = {
                first_name : firstName,
                last_name : lastName,
                password : password,
                email : email,
            }
            // axios.defaults.withCredentials = true
            axios.post(`${BACKEND}/signUp`, user).then(response => {
                console.log(response)
                if(response.status === 299)
                {
                    notification["error"]({
                        message: 'EmailId exists',
                        description:
                          'User with same EmailId is registered',
                      });
                }
                else if(response.status === 200)
                {

                    notification["success"]({
                        message: 'User Registered',
                        description:
                          'User successfully registered',
                      });
                      setTimeout(function(){
                          window.location.href = '/login'
                      }, 500)
                }
                
            }).catch(err => {
            });
        }
    }
    render() {
        
        return (
            <div>
                <Space />
                <div className='topBar' id='symbolBar' style={{backgroundColor:"#4aace9"}}>
                    <img src="data:image/png;base64,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"></img>
                </div>
                <div className="lowerSignUp">
                    <div>
                        
                        <h2 className="signUpH2"><b>Sign Up for MLAS</b></h2>
                        <p className='connect'><b>Connect with great Local businesses</b></p>
                        <p style={{marginLeft:'22%', fontSize:"80%"}}>By continuing, you agree to Yelp’s Terms of Service and</p>
                        <p style={{marginLeft:'25%', fontSize:"80%", marginTop:"-1%"}}>acknowledge Yelp’s Privacy Policy.</p>
                    </div>
                    <div>
                        <div className="apple">
                            <AppleLogin designProp = {
                                {
                                    width: 320,
                                    height: 35,
                                }
                            } />
                        </div>
                        <div className='facebook'>
                            <FacebookLogin size='small' className='facebookbtn'/>
                        </div>
                        <div id='google'>
                            <GoogleLogin  id = "googleBtn" disabled style={{opacity:'1.0 !important'}}/> 
                            <p style={{fontSize:'90%'}}>Dont worry we never post without your permission</p>   
                        </div>    
                        <div>
                            <p style={{marginLeft:"21%", color:'grey'}}><b>-----------------------Or-----------------------</b></p>
                        </div>
                    </div>
                        <div className="signUpForm">
                            {/* <Form onFinish={this.handleSubmit}> */}
                                <Row>
                                    <Col md ={6}>
                                        {/* <Form.Item id = 'firstName'
                                        rules = {[
                                            {
                                                required : true,
                                                message :"Please Enter the First Name"
                                            }
                                        ]}
                                        style = {{
                                            width : "57%"
                                        }}
                                        > */}
                                            <Input id ='firstName' placeholder="First Name"  style = {{width : "57%"}} required></Input>
                                        {/* </Form.Item> */}
                                    </Col>
                                    <Col md ={6}>
                                    {/* <Form.Item id = 'lastName'
                                        rules = {[
                                            {
                                                required : true,
                                                message :"Please Enter the Last Name"
                                            }
                                        ]}
                                        style = {{
                                            width : "57%",
                                            marginLeft:"-41%"
                                        }}
                                        > */}
                                            <Input id = 'lastName' placeholder="Last Name"  style = {{ width : "57%",marginLeft:"-41%"}}></Input>
                                    {/* </Form.Item> */}
                                    </Col>
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                    {/* <Form.Item id = 'email'
                                        rules = {[
                                            {
                                                required : true,
                                                message :"Please Enter your Email"
                                            }
                                        ]}
                                        style = {{
                                            width:"29%"
                                        }}
                                        > */}
                                            <Input placeholder="Email" id = 'email' style = {{width:"29%"}}></Input>
                                            
                                    {/* </Form.Item> */}
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                    <Input.Password id ='password' placeholder= 'Password' style = {{width:"29%"}}></Input.Password>
                                </Row>
                                <h4 style = {{marginTop:"1%"}}><b>Birthday</b> Optional</h4>
                                <Row >
                                    <Col md = {3}>
                                        {/* <Form.Item id = 'day'
                                            style = {{width:"72%"}}
                                            > */}
                                                <Select onChange = {this.onDayChange} style = {{width:"72%"}} id ='day' defaultValue = 'Day'>
                                                    {days}
                                                </Select>
                                        {/* </Form.Item> */}
                                    </Col>
                                    <Col md = {3}>
                                        {/* <Form.Item id = 'month'
                                            style = {{width:"72%", marginLeft:"-20%"}}
                                            > */}
                                                <Select onChange = {this.onMonthChange}  id = 'month' style = {{width:"72%", marginLeft:"-20%"}} defaultValue = 'Month'>
                                                    {months}
                                                </Select>
                                        {/* </Form.Item> */}
                                    </Col>
                                    <Col md = {3}>
                                        {/* <Form.Item id = 'year'
                                            style = {{width:"72%",marginLeft:"-40%"}}
                                            > */}
                                                <Select id ='year' onChange = {this.onYearChange}  style = {{width:"72%",marginLeft:"-40%"}} defaultValue = 'Year'>
                                                    {years}
                                                </Select>
                                        {/* </Form.Item> */}
                                    </Col>
                                </Row>
                                <h5 style={{marginTop:"1%"}}>You also understand that Yelp may send marketing</h5>
                                <h5 style={{marginTop:"-1%"}}>emails about Yelp’s products, services, and local</h5>
                                <h5 style={{marginTop:"-1%"}}>events. You can unsubscribe at any time.</h5>
                                <Button onClick={this.handleSubmit} size = 'large'><b>Sign Up</b></Button>
                                <p style={{color:"grey", marginLeft:"11%", marginTop:"1%"}}>Already Member on yelp? <Link to = {{
                                    pathname : '/login'
                                }}>Sign In</Link></p>
                            {/* </Form> */}
                        </div>
                        <div>
                            <img style ={{marginLeft:"55%", marginTop:"-68%"}} src="https://www.pngkey.com/png/full/229-2294529_ai-ml-platform-semiconductor-icon.png" />
                        </div>
                </div>
                
            </div>
        )
    }
}
export default SignUp;
