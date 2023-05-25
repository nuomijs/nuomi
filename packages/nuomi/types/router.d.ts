export interface Location {
  pathname?: string;
  url?: string;
  search?: string;
  hash?: string;
  query?: {
    [key: string]: any;
  };
  params?: {
    [key: string]: any;
  };
  state?: {
    [key: string]: any;
  }
}

export interface RouterAPI {
  location(): Location;
  location(path?: string | Location, data?: any, reload?: boolean): void;
  replace(path?: string | Location, data?: any, reload?: boolean): void;
  listener(callback: (location: Location, isInit?: boolean) => void): Function;
  reload(): void;
  back(step?: number): void;
  forward(step?: number): void;
  matchPath(location: Location, path: string): Location | boolean;
  mergePath(...path: string[]): string;
  block(callback: (from: Location, to: Location, enter: () => void) => any): void;
}

export const router: RouterAPI;
