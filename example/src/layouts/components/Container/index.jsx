import React, { Component } from "react"
import { NavLink, connect, useConnect, useNuomi, withNuomi } from "nuomi"

export default ({ children }) => {
  const [{ count }, dispatch] = useConnect();
  const [{ route, store }] = useNuomi();

  return (
    <div>
      <NavLink to="/">首页</NavLink>
      <NavLink to="/list" style={{ marginLeft: 10 }}>列表</NavLink>
      <a onClick={() => {
        dispatch({
          type: '@update',
          payload: {
            count: count + 1
          }
        })
      }}>{ count }</a>
      {children}
    </div>
  )
}
