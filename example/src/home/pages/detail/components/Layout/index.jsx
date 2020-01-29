import React from 'react';
import { router, useConnect } from 'nuomi';

export default function Layout() {
  const [{ detail, count, loadings }, dispatch] = useConnect();

  const click = () => {
    dispatch({
      type: 'count',
    });
  };

  const reload = () => {
    router.reload();
  };

  return (
    <div>
      <div>{loadings.$getDetail === true && <span>正在加载中...</span>}</div>
      {detail}
      <span onClick={click}>攒（{count}）</span>
      <span onClick={reload}>刷新</span>
    </div>
  );
}
