export default {
  login({ username, password }) {
    if (username !== 'nuomi' && password !== 'nuomi') {
      return {
        status: 300,
        message: '用户名或密码错误',
      };
    }
    return {
      status: 200,
    };
  },
};
