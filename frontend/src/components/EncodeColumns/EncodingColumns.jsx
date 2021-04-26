import React, { Component } from 'react'
import { Table, Tag, Space, Spin, Button, Modal, Row, Col, Switch, Radio } from 'antd';

export default class EncodingColumns extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            value : 'label_encoding',
            checked : false,
            disable : true
        }
    }

    onEncoderSelect = (e) => {
        console.log(e);
        this.setState({
           value: e.target.value  
        })
        this.props.callBackFromEncodeColumns(e.target.value, this.props.title, this.state.checked);
    }
    handleChange = (e) => {
        if(e)
        {
            this.setState({
                checked : e,
                disable : false
            })
        }
        else{
            this.setState({
                checked : e,
                disable : true
            })
        }  
        this.props.callBackFromEncodeColumns(this.state.value, this.props.title, e);
    }
    render() {
        return (
            <div>
                <li>
                    <Row style = {{marginTop : "5px"}} >
                        <Col>
                            <Switch onChange = {this.handleChange}/>
                        </Col>
                        <Col style = {{marginLeft : "10%"}}>
                            {this.props.title}
                        </Col>
                        <Col style = {{marginLeft : "2%"}}>
                            <Radio.Group value = {this.state.value} onChange = {this.onEncoderSelect} disabled = {this.state.disable}>
                                    <Radio value = {'one_hot_encoding'}>One-Hot Encoding</Radio>
                                    <Radio value = {'label_encoding'}>Label Encoding</Radio>
                            </Radio.Group>
                            
                        </Col>
                    </Row>
                </li>
            </div>
        )
    }
}
