import React, { Component } from "react"
import { NavLink, connect, useConnect, useNuomi, withNuomi, router, ShapeRoute } from "nuomi"

export default ({ children }) => {
  const [{ count, routes }, dispatch] = useConnect(({ routes, count }) => ({ routes, count }));
  const nuomi = useNuomi();
  return (
    <div>
      <NavLink to={{ path: '/', state: { a: 1 } }}>首页</NavLink>
      <NavLink to={{ path: '/list' }} style={{ marginLeft: 10 }}>列表</NavLink>

      <div onClick={() => { 
        dispatch('@update', {
          routes: routes.filter(({ path }) => path !== '/list')
        })
      }}>
        销毁list
      </div>
      <div onClick={() => {
        nuomi.reload();
      }}>
        刷新
      </div>
      <div onClick={() => {
        dispatch('@update', {
          count: count + 1
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
