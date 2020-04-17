export default {
  state: {
    dataSource: []
  },
  reducers: {
    updateState: (state, { payload }) => ({ ...state, ...payload })
  },
  effects: {
    async $getList() {
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

      this.dispatch({
        type: 'updateState',
        payload: { dataSource }
      });
    },
    remove({ name }) {
      const { dataSource } = this.getState();

      this.dispatch({
        type: 'updateState',
        payload: {
          dataSource: dataSource.filter((v) => v.name !== name)
        }
      });
    }
  },
  onInit() {
    this.store.dispatch({
      type: '$getList'
    });
  }
}
