import React from "react"
import { defineProps } from "nuomi";
import Container from "./components/Container";

export default defineProps({
  id: 'global',
  state: {
    count: 0,
    routes: [{
      path: '/',
      name: 'home',
      load: () => import('../pages/index')
    }, {
      path: '/list',
      name: 'list',
      load: () => import('../pages/list')
    }, {
      path: '/404',
      load: () => import('../pages/404')
    }, {
      to: '/404'
    }]
  },
  action: {
    
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
