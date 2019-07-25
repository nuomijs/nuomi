import BaseEffects from '../../../public/effects';
import services from '../services';

export default class Effects extends BaseEffects {
  async $getList() {
    const data = await services.getList();
    this.dispatch({
      type: 'updateState',
      payload: {
        dataSource: data,
      },
    });
  }
}
