import React from 'react';
import { useConnect } from 'nuomi';

const Layout = ({ children }) => {
  const [{ username, password, loadings }, dispatch] = useConnect();
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
      <p>
        <button onClick={login}>{loadings.$login ? '正在登录...' : '登录'}</button>
      </p>
      {children}
    </div>
  );
};

export default Layout;
