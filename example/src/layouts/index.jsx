import React from "react"
import { defineNuomi, ShapeRoute } from "nuomi";
import Container from "./components/Container";

export default defineNuomi({
  id: 'global',
  state: {
    count: 0,
  },
  render({ children, store }) {
    return <Container>
      <ShapeRoute routes={[{
        path: '/',
        reload: true,
        cache: true,
        async: () => import('../pages/index')
      }, {
        path: '/list',
        async: () => import('../pages/list')
      }, {
        path: '/404',
        async: () => import('../pages/404')
      }, {
        path: '*',
        to: '/404'
      }]} />
    </Container>
  },
});
