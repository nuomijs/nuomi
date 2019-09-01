interface nuomi {
  config(options: object): any,
  extend(targetProps: object, currentProps?: object): object,
  getDefaultProps(): object,
}

interface store {
  getState(): object,
  getStore(storeId: string): object,
  dispatch(action: object): object,
  applyMiddleware(): any,
  replaceReducer(): any,
  subscribe(): any,
}

interface router {
  listener(): any,
  location(): any
  matchPath(): any,
  reload(): any,
  back(): any,
  forward(): any,
}

declare const nuomi: nuomi;

declare const store: store;

declare const router: router;
