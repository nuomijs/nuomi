import React, { useEffect } from 'react';
import { useConnect, router } from 'nuomi';

export default () => {
  const [{ value, loading }, dispatch] = useConnect();

  useEffect(() => {
    dispatch({
      type: '$initData'
    })
  }, [])

  return <div onClick={() => {
    dispatch({
      type: '@update',
      payload: {
        value: value + 1
      }
    })
  }}>
    <div>{loading.$initData ? 'loading': ''}</div>
    <div>{value}</div>
  </div>
}
