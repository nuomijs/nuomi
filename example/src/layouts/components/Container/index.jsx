import React, { Component } from "react"
import { NavLink, connect, useConnect, useNuomi, withNuomi, router } from "nuomi"

export default ({ children }) => {
  const [{ count, value }, dispatch] = useConnect();

  return (
    <div>
      <NavLink to="/">首页</NavLink>
      <NavLink to="/list" style={{ marginLeft: 10 }}>列表</NavLink>
      <div onClick={() => {
        router.reload();
      }}>
        刷新
      </div>
      <div>
      <a onClick={() => {
        
        dispatch({
          type: '@update',
          payload: {
            count: count + 1
          }
        })
      }}>{ count }</a>
      </div>
      
      {children}
    </div>
  )
}
