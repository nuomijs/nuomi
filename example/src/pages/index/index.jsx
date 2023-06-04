import { defineNuomi } from 'nuomi';
import Container from './components/Container';

export default defineNuomi({
  state: {

  },
  effects: {
    a({ getState, commit }) {
      dispatch({
        type: '',
        payload: ''
      })
    },
    b() {
      this.a(aaa);
    }
  },
  render() {
    return <Container />
  },
  onInit() {

  },
});
