import BaseEffects from '../../../public/effects';
import services from '../services';

export default class Effects extends BaseEffects {
  count() {
    const { count } = this.getState();
    this.updateState({
      count: count + 1,
    });
  }

  async $getDetail() {
    const data = await services.getDetail();
    this.updateState(data);
  }

  async initData() {
    await this.$getDetail();
  }
}
