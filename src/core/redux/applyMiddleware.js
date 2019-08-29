import { compose } from 'redux';

export default (getMiddleware) => {
  return (createStore) => (...args) => {
    const store = createStore(...args);
    let dispatch;
    // dispatch没有被创建前调用会抛出错误
    let middlewareDispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.',
      );
    };
    const middlewareAPI = {
      getState: store.getState,
      // eslint-disable-next-line no-shadow
      dispatch: (...args) => middlewareDispatch(...args),
    };
    return {
      ...store,
      dispatch: (action) => {
        if (!dispatch) {
          const middlewares = getMiddleware();
          const chain = middlewares.map((middleware) => middleware(middlewareAPI));
          dispatch = compose(...chain)(store.dispatch);
          middlewareDispatch = dispatch;
        }
        return dispatch(action);
      },
    };
  };
};
