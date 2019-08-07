import createServices from '../../../../public/utils/createServices';
import mock from './mock';

export default createServices({
  getDetail: '/path/getDetail:post',
  ...mock,
});
