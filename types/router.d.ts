export interface RouterAPI {
  location(): any;
  listener(): any;
  reload(): any;
  back(): any;
  forward(): any;
  matchPath(): any;
}

export const router: RouterAPI;
