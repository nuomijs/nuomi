import React from 'react';
import { Table, Button } from 'antd';
import { useConnect } from '@nuomi';

const List = () => {
  const [{ dataSource, loading }, dispatch] = useConnect();

  const remove = ({ name }) => {
    dispatch({
      type: 'remove',
      payload: {
        name
      }
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
    dispatch({
      type: '$getList'
    });
  };

  if (!dataSource.length && !loading.$getList) {
    return <Button type="primary" onClick={tryOne}>再试一次</Button>
  }

  return (
    <Table
      loading={!!loading.$getList}
      rowKey="name"
      dataSource={dataSource}
      columns={columns}
      bordered
    />
  );
};

export default List;
