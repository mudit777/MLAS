import React, {useState, useEffect} from 'react'
import { Table } from 'antd';
import {Link} from 'react-router-dom';

const columns = [
  { title: 'File Name', dataIndex: 'name', key: 'name' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  // { title: 'Evaluation ', dataIndex: 'address', key: '' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <Link to="/model_6095b80646a7db0985245323.sav" target="_blank" download>Download Model</Link>,
  },
];

const data = [
  {
    key: '1',
    name: 'iris_dataset',
    type: 'regression',
    description: 'R2 Score: 0.99831',
  },
  {
    key: '2',
    name: 'iris_2',
    type: 'regression',
    description: 'R2 Score: 0.99831, Mean Squared Error: 0.02835',
  },
  {
    key: '3',
    name: 'pima_indian',
    type: 'classification',
    description: 'Accuracy: 0.91344, Precision: 0.21342'
  },
];

const Result = () => {
  const [user_name, set_user_name] = useState('');

  useEffect(()=>{
    set_user_name(sessionStorage.getItem("user_name"))
  },[user_name])

  return (
    <div>
      <div style={{height:"65px", background:"#e6f2ff"}}>
          <img style={{height:45, width:45, marginLeft:"50%", marginTop:"0.5%"}} src="https://www.pngkey.com/png/full/229-2294529_ai-ml-platform-semiconductor-icon.png" alt-text="mlaas_logo"></img>
      </div>
      <h1 style={{textAlign:"center", padding:"1rem 1rem"}}>Hello {user_name}</h1>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
    </div>
  )
}

export default Result;