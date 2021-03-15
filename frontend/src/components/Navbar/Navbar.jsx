import React, { Component } from 'react'
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { VerticalAlignTopOutlined} from '@ant-design/icons';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <Menu mode="horizontal" style = {{fontSize : "20px"}}>
                    <Menu.Item   icon = {<FontAwesomeIcon style = {{fontsize : "20px"}} icon = {faNewspaper}/>}> 
                         New Stories
                    </Menu.Item>
                    <Menu.Item onClick = {this.handleTopStories} icon = {<VerticalAlignTopOutlined />}>
                        Top Stories
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
