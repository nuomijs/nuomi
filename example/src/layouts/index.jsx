import React from "react"
import { define, ShapeRoute } from "nuomi";
import Container from "./components/Container";

export default define({
  id: 'global',
  state: {
    count: 0,
  },
  extends: [{
    state: {
      value: 1
    },
    extends: [{
      state: {
        value: 2
      },
    }]
  }],
  render() {
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
