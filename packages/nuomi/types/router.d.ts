export type RouteObject = {
  pathname: string;
  url: string;
  search: string;
  hash: string;
  query: {
    [key: string]: any;
  };
  params: {
    [key: string]: any;
  };
  state: {
    [key: string]: any;
  }
}

export type RouterAPI = {
  route(): RouteObject;
  push(path?: string | RouteObject, reload?: boolean): void;
  replace(path?: string | RouteObject, reload?: boolean): void;
  listener(callback: (route: RouteObject, isInit?: boolean) => void): Function;
  reload(): void;
  back(step?: number): void;
  forward(step?: number): void;
  matchPath(route: RouteObject, path: string): RouteObject | boolean;
  mergePath(...path: string[]): string;
  block(callback: (from: RouteObject, to: RouteObject, enter: () => void) => any): void;
}

export const router: RouterAPI;
