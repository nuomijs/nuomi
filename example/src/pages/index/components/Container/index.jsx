import React, { useEffect } from 'react';
import { useConnect, router } from 'nuomi';

export default () => {
  const [{ value, loading }, dispatch] = useConnect();
  
  useEffect(() => {
    dispatch({
      type: '$initData',
    });
  }, [])


  return <div onClick={() => {
    router.reload();
  }}>
    <div>{loading.$initData ? 'loading': ''}</div>
    <div>{value}</div>
  </div>
}
