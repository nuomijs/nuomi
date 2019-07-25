import BaseEffects from '../../../public/effects';
import services from '../services';

export default class Effects extends BaseEffects {
  count() {
    const { count } = this.getState();
    this.dispatch({
      type: 'updateState',
      payload: {
        count: count + 1,
      },
    });
  }

  async $getDetail() {
    const data = await services.getDetail();
    this.dispatch({
      type: 'updateState',
      payload: data,
    });
  }

  async initData() {
    await this.$getDetail();
  }
}
