import React, { Component } from 'react'
import axios from 'axios';
import { BACKEND } from '../../Config';
import { Table, Tag, Space, Spin, Button, Modal, Row, Col, Switch } from 'antd';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faSmileBeam } from '@fortawesome/free-regular-svg-icons';




export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading : false,
            columns : [],
            data : [],
            display : "block",
            tableDisplay : "none",
            fileLink : "",
            visible : false
        }
        console.log(sessionStorage)
    }
    uploadFile = (e) => {
        this.setState({loading : true})
        var fd = new FormData();
        fd.append("file", e.target.files[0]);
        fd.append("user_id", sessionStorage.UserId);
        console.log(fd);
        // var myJson = {
        //     user_id: sessionStorage.UserId,
        //     form_data: fd
        // }
        console.log(fd);
        axios.post(`${BACKEND}/uploadFile`, fd).then(response => {  
            // console.log(response)
            if(response.status === 200) {
                
                // console.log(response.data.cols)
                var cols = [];
                response.data.cols.map(x => {
                    let temp = {}; 
                    temp['title'] = x;
                    temp.dataIndex = x;
                    temp.key = x;
                    cols.push(temp);
                })
                var values = [];
                var i = 0;
                response.data.values.map(x => {
                    let temp = JSON.parse(x);
                    temp.key = i++;
                    values.push(temp)
                })
                this.setState({
                    loading : false,
                    columns : cols,
                    data : values,
                    fileLink : response.data.fileLink,
                    display : "none",
                    tableDisplay : "block"
                })
                document.getElementById('test').display = "none"
            }
        }).catch(err => {
            console.log(err);
        })
    }
    clicked = () => document.getElementById("upload").click();
    handleCancel = () => {
        this.setState({
            visible : false
        })
    }
    openUpdateColumns = () => {
        this.setState({
            visible : true
        })
    }
    render() {
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div id = "test" style={{display : this.state.display}}>
                    <div style={{marginTop:"2%", marginLeft:"44%"}}>
                        <FontAwesomeIcon size = "large" style = {{fontSize : "100px", color : "#4aace9", marginLeft : "8%"}} icon = {faSmile}/>
                        <div>
                            <Button style = {{width : "30%", marginTop :"2%"}} onClick={this.clicked}>
                                Upload CSV
                            </Button>
                        </div>
                    </div>

                    
                    <input style = {{display : "none" }}accept = ".csv" type = 'file' id = "upload"   onChange = {this.uploadFile}/>
                </div>
                <div style = {{height : "60%", overflowY : "scroll"}}>
                    <div>
                        <Button onClick={this.openUpdateColumns} style = {{display : this.state.tableDisplay, marginTop : "2%", width : "15%", float : "right", marginRight:"1%"}}>Update Columns</Button>
                    </div>
                    <Spin style = {{marginLeft : "51%", marginTop : "7%"}} size = "large" spinning = {this.state.loading}/>
                    <div style = {{marginTop : "4%", marginLeft : "1%", marginRight : "1%"}}>
                        <Table size = "small" style = {{display : this.state.tableDisplay, overflowY :"scroll"}}  columns={this.state.columns} dataSource={this.state.data} />
                    </div>
                </div>
                <div>
                    <Modal title = "Add an event"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer = {[
                                // <Button onClick = {this.handleCancel}>Cancel</Button>,
                                // <Button loading={this.state.loading} onClick = {this.registerForEvent}>Register For Event</Button>
                            ]}
                        >
                            <ul style = {{listStyleType: "none"}}>
                                {this.state.columns.map(col => {
                                    return(
                                        <li>
                                            <Row>
                                                <Col>
                                                    <h3>{col}</h3>
                                                </Col>
                                                <Col>
                                                    {/* <Switch /> */}
                                                </Col>
                                            </Row>
                                        </li>
                                    )
                                })}
                            </ul>
                    </Modal>
                </div>
            </div>
        )
    }
}
