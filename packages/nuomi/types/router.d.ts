export type Location = {
  path?: string;
  name?: string;
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

export interface NamePathObject {
  name: string;
  path: string;
}

export type RouterAPI = {
  location(): Location;
  push(path?: string | Location, reload?: boolean): void;
  replace(path?: string | Location, reload?: boolean): void;
  listener(beforeCallback: (location: Location, isInit?: boolean) => void, afterCallback?: (location: Location) => void): Function;
  reload(): void;
  back(step?: number): void;
  forward(step?: number): void;
  matchPath(location: Location, path: string): Location | boolean;
  mergePath(...path: string[]): string;
  namePath(name: string, path: string): void;
  namePath(data: NamePathObject[]): void;
  normalizePath(path: string): string;
  parserPath(path: string): Location;
  block(callback: (from: Location, to: Location, enter: () => void) => any): void;
}

export const router: RouterAPI;
