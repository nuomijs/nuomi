import React, { Component } from "react"
import { NavLink, connect, useConnect, useNuomi, withNuomi, router, ShapeRoute } from "nuomi"

export default ({ children }) => {
  const [{ routes, count }, dispatch] = useConnect();
  return (
    <div>
      <NavLink to="/">首页</NavLink>
      <NavLink to="/list" style={{ marginLeft: 10 }}>列表</NavLink>

      <div onClick={() => {
        dispatch({
          type: '@update',
          payload: {
            routes: routes.filter(({ path }) => path !== '/list')
          }
        })
      }}>
        销毁list
      </div>
      <div onClick={() => {
        router.reload();
      }}>
        刷新
      </div>
      <div onClick={() => {
        dispatch({
          type: '@update',
          payload: {
            count: count + 1
          }
        })
      }}>
        点击{count}
      </div>
      <div>
        <ShapeRoute routes={routes} />
      </div>
    </div>
  )
}
