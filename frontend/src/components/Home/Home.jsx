import React, { Component } from 'react'
import axios from 'axios';
import { BACKEND } from '../../Config';
import { Table, Tag, Space, Spin, Button, Modal, Row, Col, Switch, Radio, Checkbox, Select, Input } from 'antd';
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
            pairPlotImage : "",
            autoMLVisible: false,
            algoType : 'Classification',
            metrics: [],
            targetColumn : ""
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
            encodeVisible : false,
            autoMLVisible: false
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
    handlePairPlotCancel = () => {
      console.log("Cancel pair plot")
        this.setState({
          PairPlotVisible : false
        })
    }

    handleAlgoExit = () => {
        this.setState({
          autoMLVisible : false
        })
    }

    openAutoML = () => {
        var myJson = {
            file : this.state.fileLink
        }
        // axios.post(`${BACKEND}/pairPlot`, myJson).then(response => {
        //     console.log(response.data)
        //     this.setState({
        //         autoMLVisible : true,
        //         // pairPlotImage : response.data
        //     })
        // })
        this.setState({
            autoMLVisible : true
        })
    }
    runAutoML = () => {
        var myJson = {
            file : this.state.fileLink,
            evaluation_met : this.state.metrics,
            algo_type : this.state.algoType,
            targetColumn : this.state.targetColumn
        }
        axios.post(`${BACKEND}/runAutoML`, myJson).then(response => {
          
        })
        this.setState({
          autoMLVisible : false
      })
    }
    selectAlgorithm = (e) => {
        this.setState({
            algoType : e.target.value
        })
    }
    addAlgorithm = (e) => {
        var arr = this.state.metrics
        arr.push(e.target.value)
        this.setState({
            metrics : arr
        })
    }
    handleSelectChange = (value) => {
        this.setState({
            targetColumn : value
        })
    }
    render() {
        console.log(this.state.metrics)
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
        var checkbox_select = null;
        if(this.state.algoType === 'Classification'){
            checkbox_select = <div>
                <Checkbox onChange = {this.addAlgorithm} value='Accuracy'>Accuracy</Checkbox>
                <Checkbox onChange = {this.addAlgorithm} value='Precision'>Precision</Checkbox>
                <Checkbox onChange = {this.addAlgorithm} value='Recall'>Recall</Checkbox>
                <Checkbox onChange = {this.addAlgorithm} value='F1_score'>F1-score</Checkbox>
                <Checkbox onChange = {this.addAlgorithm} value='ROC_AUC'>ROC-AUC</Checkbox>
            </div>
        }
        else{
            checkbox_select = <div>
                <Checkbox onChange = {this.addAlgorithm} value='R2'>R2</Checkbox>
                <Checkbox onChange = {this.addAlgorithm} value='Mean_Square_Error'>Mean Square Error</Checkbox>
            </div>
        }
        return (
            <div>
                <div style={{height:"65px", background:"#e6f2ff"}}>
                    <img style={{height:45, width:45, marginLeft:"50%", marginTop:"0.5%"}} src="https://www.pngkey.com/png/full/229-2294529_ai-ml-platform-semiconductor-icon.png" alt-text="mlaas_logo"></img>
                </div>
                <div id = "test" style={{display : this.state.display}}>
                    <div style={{marginTop:"2%"}}>
                        <h1 style={{marginLeft:"40%", color: "#0b6a87", fontWeight: 'bolder', fontFamily:'serif'}}>Please upload your dataset here</h1>
                        <h4 style={{marginLeft:"44%"}}>Please clean the dataset of null values</h4>
                        <div style={{marginLeft:"44%"}}>
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
                        <Col>
                            <Button onClick = {this.openAutoML}  style = {{display : this.state.tableDisplay, marginTop : "2%", width : "100%", float : "right", marginRight:"1%"}}>Run AutoML</Button>
                        </Col>
                        <Col>
                            <Button onClick = {() => {window.location.replace('/result')}} style = {{display : this.state.tableDisplay, marginTop : "2%", width : "100%", float : "right", marginRight:"1%"}}>View Results</Button>
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
                            onCancel={this.handlePairPlotCancel}
                            footer = {[
                                <Button onClick = {this.encodeColumnsFinal}>Encode Columns</Button>
                            ]}
                          width = "600px"
                        >
                            <img src = "https://s3.us-east-1.amazonaws.com/mlaas-cmpe295b/2.png" alt = "pair plot"/>
                    </Modal>
                    <Modal title = "Select Algorithm Type"
                            visible={this.state.autoMLVisible}
                            onOk={this.handleOk}
                            onCancel={this.handleAlgoExit}
                            footer = {[
                                <Button onClick = {this.runAutoML}>Run AutoML</Button>
                            ]}
                          width = "600px"
                        >
                            <Input type="text" style={{width:"50%"}} placeholder="Enter dataset name"></Input>
                            <br/>
                            <br/>
                            <Radio.Group value = {this.state.algoType} onChange = {this.selectAlgorithm}>
                                <Radio value = 'Classification'>Classification</Radio>
                                <Radio value = 'Regression'>Regression</Radio>
                            </Radio.Group>
                            <br />
                            <p>Select Evaluation Metrics</p>
                            {checkbox_select}
                            <br />
                            <div>
                                <p>
                                    Select target column
                                </p>
                                <Select onChange = {this.handleSelectChange} style = {{width : "200px"}}>
                                {this.state.columns.map(i => {
                                    return(
                                        <Select.Option value = {i.title}>{i.title}</Select.Option>
                                    )
                                })}
                                </Select>
                            </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
