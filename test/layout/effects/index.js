import BaseEffects from '../../public/effects';
import services from '../services';

export default class Effects extends BaseEffects {
  async $getInfo() {
    const data = await services.getInfo();
    this.dispatch({
      type: 'updateState',
      payload: data,
    });
  }
}
