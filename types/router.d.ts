export interface RouterAPI {
  location(): any;
  listener(): any;
  reload(): any;
  replace(): any;
  back(): any;
  forward(): any;
  matchPath(): any;
  mergePath(): any;
  beforeEnter(): any;
}

export const router: RouterAPI;
