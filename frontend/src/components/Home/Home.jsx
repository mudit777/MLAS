import React, { Component } from 'react'
import axios from 'axios';
import { BACKEND } from '../../Config';
import { Table, Tag, Space, Spin, Button, Modal, Row, Col, Switch } from 'antd';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faSmileBeam } from '@fortawesome/free-regular-svg-icons';
import ColRows from '../ColRows/ColRows';
import EncodingColumns from '../EncodeColumns/EncodingColumns';




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
            visible : false,
            selectedColumns: [],
            fileName : "",
            encodeVisible : false,
            encodedColumns : {},
            PairPlotVisible : false,
            pairPlotImage : ""
        }
    }
    uploadFile = (e) => {
        this.setState({loading : true})
        var fd = new FormData();
        fd.append("file", e.target.files[0]);
        fd.append("user_id", sessionStorage.UserId);
        // var myJson = {
        //     user_id: sessionStorage.UserId,
        //     form_data: fd
        // }
        axios.post(`${BACKEND}/uploadFile`, fd).then(response => {  
            if(response.status === 200) {
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
                    tableDisplay : "block",
                    fileName : response.data.fileName
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
    openEncodeColumns = () => {
        this.setState({
            encodeVisible : true
        })
    }
    addSelectedColumns = (name, checked) => {
        var arr = this.state.selectedColumns;
        if(checked){
            arr.push(name);
            
        }
        else{
            var index  = arr.indexOf(name);
            if(index > -1){
                arr.splice(index, 1)
            }
        }
        this.setState({
            selectedColumns : arr
        }); 
    } 
    updateColumns = () => {
        var myJson = {
            columns : this.state.selectedColumns,
            file : this.state.fileLink,
            file_name : this.state.fileName
        }
        axios.post(`${BACKEND}/updateFile`, myJson).then(response => {
            if(response.status === 200)
            {
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
                    tableDisplay : "block",
                    fileName : response.data.fileName,
                    visible : false
                })
            }
        })
    }
    encodeColumnsFromChildren = (value, title, checked) => {
        var arr = this.state.encodedColumns;
        if(checked)
        {
            arr[title] = value
        }
        else {
            delete arr[title];
        }
        this.setState({
            encodedColumns : arr
        })
    }
    encodeColumnsFinal = () => {
        console.log(this.state.encodedColumns)
        var myJson = {
            file : this.state.fileLink,
            file_name : this.state.fileName,
            columns : this.state.encodedColumns
        };
        axios.post(`${BACKEND}/encodeColumns`, myJson).then(response => {
            if(response.status === 200)
            {
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
                    tableDisplay : "block",
                    fileName : response.data.fileName,
                    encodeVisible : false
                })
            }
        })
    }
    handleEncodeCancel = () => {
        this.setState({
            encodeVisible : false
        })
    }
    openPairPlot = () => {
        var myJson = {
            file : this.state.fileLink
        }
        axios.post(`${BACKEND}/pairPlot`, myJson).then(response => {
            console.log(response.data)
            this.setState({
                PairPlotVisible : true,
                pairPlotImage : response.data
            })
        })
        this.setState({
            PairPlotVisible : true
        })
    }
    render() {
        var temp = null
        if(this.state.columns.length > 0){
            temp =
            <ul style={{listStyleType:'none'}}>
                {this.state.columns.map(i => {
                            return(
                                <div>
                                    <ColRows title = {i.title} callBackFromChild = {this.addSelectedColumns} />
                                </div>
                            )
                        })
                    }
            </ul>  
        }
        var temp2 = null;
        if(this.state.columns.length > 0){
            temp2 =
            <ul style={{listStyleType:'none'}}>
                {this.state.columns.map(i => {
                            return(
                                <div>
                                    <EncodingColumns title = {i.title} callBackFromEncodeColumns = {this.encodeColumnsFromChildren}/>
                                </div>
                            )
                        })
                    }
            </ul>  
        }
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
                    <Row>
                        <Col>
                            <Button onClick={this.openUpdateColumns} style = {{display : this.state.tableDisplay, marginTop : "2%", width : "100%", float : "right", marginRight:"1%"}}>Remove Columns</Button>
                        </Col>
                        <Col>
                            <Button onClick={this.openEncodeColumns} style = {{display : this.state.tableDisplay, marginTop : "2%", width : "100%", float : "right", marginRight:"1%"}}>Encode Columns</Button>
                        </Col>
                        <Col>
                            <Button onClick = {this.openPairPlot}  style = {{display : this.state.tableDisplay, marginTop : "2%", width : "100%", float : "right", marginRight:"1%"}}>Pair Plot</Button>
                        </Col>
                    </Row>
                    <div>
                        
                    </div>
                    
                    <Spin style = {{marginLeft : "51%", marginTop : "7%"}} size = "large" spinning = {this.state.loading}/>
                    <div style = {{marginTop : "4%", marginLeft : "1%", marginRight : "1%"}}>
                        <Table size = "small" style = {{display : this.state.tableDisplay, overflowY :"scroll"}}  columns={this.state.columns} dataSource={this.state.data} />
                    </div>
                </div>
                <div>
                    <Modal title = "Select Columns to Remove"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer = {[
                                // <Button onClick = {this.handleCancel}>Cancel</Button>,
                                <Button onClick = {this.updateColumns}>Remove Columns</Button>
                            ]}
                            style = {{
                                
                            }}
                        >
                            {temp}
                    </Modal>
                    <Modal title = "Select Columns to Encode"
                            visible={this.state.encodeVisible}
                            onOk={this.handleOk}
                            onCancel={this.handleEncodeCancel}
                            footer = {[
                                <Button onClick = {this.encodeColumnsFinal}>Encode Columns</Button>
                            ]}
                           width = "600px"
                        >
                            {temp2}
                    </Modal>
                    <Modal title = "Plot Pair"
                            visible={this.state.PairPlotVisible}
                            onOk={this.handleOk}
                            onCancel={this.handleEncodeCancel}
                            footer = {[
                                <Button onClick = {this.encodeColumnsFinal}>Encode Columns</Button>
                            ]}
                           width = "600px"
                        >
                            <img src = "https://s3.us-east-1.amazonaws.com/mlaas-cmpe295b/2.png" alt = "pair plot"/>
                    </Modal>
                </div>
            </div>
        )
    }
}
