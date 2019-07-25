export default class Effects {
  constructor({ store }) {
    this.getState = store.getState;
    this.dispatch = store.dispatch;
  }
}
