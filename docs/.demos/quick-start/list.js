export default {
  state: {
    data: []
  },
  reducers: {
    updateState: (state, payload) => ({ ...state, ...payload })
  },
  actions: {
    async $getList({ commit }) {
      // 模拟请求
      const data = await new Promise((res) => {
        setTimeout(() => {
          res([
            { name: 'react' },
            { name: 'redux' },
            { name: 'router' }
          ]);
        }, 500);
      });
      commit('updateState', { data });
    },
    remove({ commit, getState }, { name }) {
      const { data } = getState();
      commit('updateState', {
        data: data.filter((v) => v.name !== name)
      });
    }
  },
  onInit({ store }) {
    store.dispatch('$getList');
  }
}
