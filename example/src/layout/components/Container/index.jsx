import React from "react"
import { NavLink, router, useConnect } from "nuomi"

export default ({ children }) => {
  const [{ count }, dispatch] = useConnect();
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
