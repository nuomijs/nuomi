import createServices from '../../../public/utils/createServices';
import mock from './mock';

export default createServices({
  getList: '/path/getList:post',
  ...mock,
});
