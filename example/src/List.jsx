import React from 'react';
import { Table, Button } from 'antd';
import { useConnect } from 'nuomi';

const List = () => {
  const [{ data, loading }, dispatch] = useConnect();

  const remove = ({ name }) => {
    dispatch('remove', {
      name
    });
  };

  const columns = [{
    title: '框架',
    dataIndex: 'name'
  }, {
    title: '操作',
    render: (text, record) => <Button onClick={() => remove(record)}>删除</Button>
  }];

  return (
    <Table
      loading={loading.$getList}
      rowKey="name"
      dataSource={data}
      columns={columns}
      bordered
    />
  );
};

export default List;
