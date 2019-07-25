import createServices from '../../public/utils/createServices';
import mock from './mock';

export default createServices({
  getInfo: '/path/getInfo:postJSON',
  ...mock,
});
