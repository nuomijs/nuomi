import React from 'react';
import { Table, Button } from 'antd';
import { useConnect } from '@nuomi';

const List = () => {
  const [{ data, $getList }, dispatch] = useConnect();

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

  const tryOne = () => {
    dispatch('$getList');
  };

  if (!data.length && !$getList) {
    return <Button type="primary" onClick={tryOne}>再试一次</Button>
  }

  return (
    <Table
      loading={$getList}
      rowKey="name"
      dataSource={data}
      columns={columns}
      bordered
    />
  );
};

export default List;
