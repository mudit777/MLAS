import React, {useState, useEffect} from 'react'
import { Table } from 'antd';

const columns = [
  { title: 'File Name', dataIndex: 'name', key: 'name' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  // { title: 'Evaluation ', dataIndex: 'address', key: '' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Download Model</a>,
  },
];

const data = [
  {
    key: '1',
    name: 'iris_dataset',
    type: 'regression',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'iris_2',
    type: 'regression',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'pima_indian',
    type: 'classification',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];

const Result = () => {
  const [user_name, set_user_name] = useState('');

  useEffect(()=>{
    set_user_name(sessionStorage.getItem("user_name"))
  },[user_name])

  return (
    <div>
      Hello {user_name}
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