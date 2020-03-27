import { router } from 'nuomi';
import BaseEffects from '../../public/effects';
import services from '../services';

export default class Effects extends BaseEffects {
  async $login() {
    const { username, password } = this.getState();
    const { data } = await services.login({ username, password });
    if (data.status === 200) {
      sessionStorage.setItem('isLogin', 1);
      router.location('/home');
    } else {
      window.alert(data.message);
    }
  }
}
