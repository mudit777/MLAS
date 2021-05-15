import React, { Component } from 'react'
import { Table, Tag, Space, Spin, Button, Modal, Row, Col, Switch } from 'antd';

export default class ColRows extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    handleChange = (e) => {
        this.props.callBackFromChild(this.props.title, e);
    }
    render() {
        return (
            <div>
                <li>
                    <Row>
                        <Col>
                            <Switch onChange = {this.handleChange}/>
                        </Col>
                        <Col style = {{marginLeft : "10%"}}>
                            {this.props.title}
                        </Col>
                    </Row>
                </li>
            </div>
        )
    }
}
