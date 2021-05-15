import { Button } from 'antd'
import React, { Component } from 'react'

class AboutUs extends Component {

    submitSignIn = (e) => {
        this.props.history.push(`/login`);
    }

    render() {
        return (
            <div>
                <div style={{height:"65px", background:"#e6f2ff"}}>
                    <img style={{height:45, width:45, marginLeft:20}} src="https://www.pngkey.com/png/full/229-2294529_ai-ml-platform-semiconductor-icon.png" alt-text="mlaas_logo"></img>
                    <Button onClick = {this.submitSignIn} style={{fontWeight:'bold', height:40, width:100, backgroundColor:'#4080ed', marginTop:10, marginLeft:1230, borderRadius:5}}>SignIn</Button>
                </div>
                <div style={{height:"450px", background:"#e6f2ff"}}>
                    <img style={{height:"450px", width:"100%"}} src="https://images.squarespace-cdn.com/content/v1/53528f90e4b0768cad09d33b/1541186576265-RWK67UCDI04WXSJR5GQO/ke17ZwdGBToddI8pDm48kLHJ70-JWA9dgEOAbI336f17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0p4XabXLlNWpcJMv7FrN_NK7gC7ng9OtoO5ep7zCz0n67pPMXhJpSCNtoO-H2bRokQ/Artificial_intelligence.jpeg?format=1500w"></img>
                </div>
                <div style={{height:"450px", background:"#e6f2ff"}}>
                    <p style={{textAlign:"center", fontFamily: "", fontWeight:"bold", color: "#000080", marginTop: "5px", fontSize: "20px", fontFamily:'initial'}}>About Us</p>
                    <div style= {{width:"600px", alignContent:"center", textAlign:"center", marginLeft:"30%"}}>
                        <p style={{color: "#0b6a87", fontWeight: 'bolder', fontFamily:'serif', fontSize:'18px'}}>Machine Learning as A Service is a platform where users are welcome to upload their data and perform various machine learning algorithms in Classificaiton and Regression on that data. The user is also provided with various evaluation metrices to chose from and can get the generated Machine Learning model with just one click.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs;
