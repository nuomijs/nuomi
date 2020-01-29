import React from 'react';
import { router, useConnect } from 'nuomi';

export default function Layout() {
  const [{ dataSource, loadings }] = useConnect();
  const click = (count) => {
    router.location(`/home/detail/${count}`, ({ store }) => {
      store.dispatch({
        type: 'updateState',
        payload: { count },
      });
    });
  };
  return (
    <div>
      {loadings.$getList === true && <span>正在加载中...</span>}
      <ul>
        {dataSource.map(({ title }, i) => (
          <li key={i}>
            <a onClick={() => click(i)}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
