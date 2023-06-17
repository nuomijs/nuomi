import React, { useEffect } from 'react';
import { useConnect, router } from 'nuomi';
import Footer from '../Footer';

export default () => {
  const [{ value, $initData }, dispatch] = useConnect();
  console.log(1)
  useEffect(() => {
    dispatch('$initData')
  }, [])

  return (
    <div>
      <div onClick={() => {
    dispatch('@update', {
      value: value + 1
    })
  }}>
    <div>{$initData ? 'loading': ''}</div>
    <div>{value}</div>
    </div>
    <Footer />
    </div>
  )
}
