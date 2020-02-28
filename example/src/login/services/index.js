import { createServices } from 'nuomi-request';
import mock from './mock';

export default createServices({
  login: 'POST /path/login',
}, mock);
