import React, { Component } from 'react'
import axios from 'axios';
import { BACKEND } from '../../Config';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    uploadFile = (e) => {
        console.log(e.target.files[0]);
        var fd = new FormData();
        fd.append("file", e.target.files[0]);
        axios.post(`${BACKEND}/uploadFile`, fd).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })

    }
    render() {
        return (
            <div>
                <div>
                    <input type = 'file'  onChange = {this.uploadFile}/>
                </div>
            </div>
        )
    }
}
