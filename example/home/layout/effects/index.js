import BaseEffects from '../../../public/effects';
import services from '../services';

export default class Effects extends BaseEffects {
  async $getInfo() {
    const data = await services.getInfo();
    this.updateState(data);
  }

  async setRoutes() {
    await services.getInfo();
    this.updateState({
      routes: [
        {
          path: '/a/',
          render() {
            return 'a';
          },
        },
        {
          path: '/b/',
          render() {
            return 'b';
          },
        },
      ],
    });
  }

  async removeRoutes() {
    this.updateState({ routes: [] });
  }
}
