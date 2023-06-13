export default {
  state: {
    dataSource: []
  },
  reducer: {
    updateState: (state, { payload }) => ({ ...state, ...payload })
  },
  action: {
    async $getList(e, { commit }) {
      // 模拟请求
      const dataSource = await new Promise((res) => {
        setTimeout(() => {
          res([
            { name: 'react' },
            { name: 'redux' },
            { name: 'router' }
          ]);
        }, 500);
      });
      commit('updateState', { dataSource });
    },
    remove({ name }, { commit }) {
      const { dataSource } = this.getState();
      commit('updateState', {
        dataSource: dataSource.filter((v) => v.name !== name)
      });
    }
  },
  onInit() {
    this.store.dispatch('$getList');
  }
}
