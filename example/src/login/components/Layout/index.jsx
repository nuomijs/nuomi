import React from 'react';
import { connect } from 'nuomi';

const Layout = ({ username, password, loadings, dispatch }) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'updateState',
      payload: {
        [name]: value.trim(),
      },
    });
  };

  const login = () => {
    if (!loadings.$login) {
      dispatch({
        type: '$login',
      });
    }
  };

  return (
    <div>
      <p>
        Username：
        <input
          type="text"
          value={username}
          name="username"
          autoComplete="off"
          onChange={onChange}
        />
      </p>
      <p>
        Password：
        <input type="password" value={password} name="password" onChange={onChange} />
      </p>
      账号密码：nuomi
      <p>
        <button onClick={login}>{loadings.$login ? '正在登录...' : '登录'}</button>
      </p>
    </div>
  );
};

export default connect(({ username, password, loadings }) => ({ username, password, loadings }))(
  Layout,
);
