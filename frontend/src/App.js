import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Main from './Main';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
