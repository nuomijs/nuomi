import createServices from '../../public/utils/createServices';
import mock from './mock';

export default createServices({
  login: '/path/login:post',
  ...mock,
});
