import React, { Component } from "react"
import { NavLink, connect, useConnect, useNuomi, withNuomi, router, ShapeRoute } from "nuomi"

export default ({ children }) => {
  const [{ count, routes, ...rest }, dispatch] = useConnect();
  console.log(rest)
  return (
    <div>
      <NavLink to={{ name: 'home' }}>首页</NavLink>
      <NavLink to={{ name: 'list' }} style={{ marginLeft: 10 }}>列表</NavLink>

      <div onClick={() => {
        dispatch('@update', {
          routes: routes.filter(({ path }) => path !== '/list')
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
