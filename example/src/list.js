import { defineProps } from 'nuomi';

export default defineProps({
  state: {
    data: []
  },
  reducer: {
    updateData: (state, payload) => ({ ...state, ...payload })
  },
  action: {
    async $getList(e, { commit }) {
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
      commit('updateData', { data });
    },
    remove({ name }, { getState, commit }) {
      const { data } = getState();
      commit('updateData', {
        data: data.filter((v) => v.name !== name)
      });
    }
  },
  onInit() {
    this.store.dispatch('$getList');
  }
});
