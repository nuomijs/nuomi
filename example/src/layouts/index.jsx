import React from "react"
import { define } from "nuomi";
import Container from "./components/Container";

export default define({
  id: 'global',
  state: {
    count: 0,
    routes: [{
      path: '/',
      async: () => import('../pages/index')
    }, {
      path: '/list',
      async: () => import('../pages/list')
    }, {
      path: '/404',
      async: () => import('../pages/404')
    }, {
      to: '/404'
    }]
  },
  effects: {
    $a() {

    },
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
    return <Container />
  },
});
