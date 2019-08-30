import { router } from 'nuomi';
import BaseEffects from '../../public/effects';
import services from '../services';

export default class Effects extends BaseEffects {
  async $login() {
    try {
      const { username, password } = this.getState();
      await services.login({ username, password });
      sessionStorage.setItem('isLogin', 1);
      router.location('/home');
    } catch (e) {
      if (e.status === 300) {
        window.alert(e.message);
      }
    }
  }
}
