import React from "react"
import { defineProps } from "nuomi";
import Container from "./components/Container";

export default defineProps({
  id: 'global',
  state: {
    name: '',
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
  getter: {
    aaa({ count }) {
      return count + 1
    },
    bbb() {
      return [1, 2]
    }
  },
  action: {
    async $getData2({ getter }) {
      await new Promise((res) => {
        setTimeout(() => {
          res();
        }, 500)
      });
    },
    async $getData(store, b) {
      await new Promise((res) => {
        setTimeout(() => {
          res();
        }, 500)
      });
      await this.$getData2(store);
    },
    async $initData({ getState }) {
      const state = getState();
      await this.$getData(111);
    }
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
  onInit({ store }) {
    // store.dispatch('$initData')
  }
});
