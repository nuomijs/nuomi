import { RouteObject } from './router';
import { NuomiStore } from './store';

export interface NuomiReducers {
  [key: string]: (state: any, payload: any) => any;
}

export interface NuomiEffects {
  [key: string]: (store: NuomiStore, payload: any) => any;
}

export type RoutePropValue = {
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

export interface NuomiProps {
  id?: string;
  state?: object;
  reducers?: NuomiReducers;
  effects?: NuomiEffects;
  async?: (cb?: (props: any) => void) => any;
  render?: (props: Props) => any;
  onInit?: (props: Props) => any;
  children?: any;
  [key: string]: any;
}

export interface RouteProps extends NuomiProps {
  path?: string;
  cache?: boolean | 'state';
  reload?: boolean | null;
  onEnter?: (enter: () => void) => boolean;
  onShow?: (props: Props) => any;
  onActivte?: (props: Props) => any;
  onLeave?: (leave: () => void, to: RouteObject) => boolean;
}

export interface NuomiRouteProps extends NuomiProps {
  pathPrefix?: string | RegExp;
  path?: string;
}

export type Props = RouteProps & NuomiRouteProps & {
  store?: NuomiStore;
  route?: RouteObject;
}

export interface ShapeRouteProps {
  routes: object[];
}

export interface RouterProps {
  basename?: string;
  type?: 'hash' | 'browser';
}

export interface StaticRouterProps {
  basename?: string;
  route?: string | RoutePropValue;
  context?: object;
}

export interface RedirectProps {
  from?: string;
  to?: string | RoutePropValue;
  reload?: boolean;
}

export interface LinkProps {
  to?: string | RoutePropValue;
  replace?: boolean;
  reload?: boolean;
}

export interface NavLinkProps extends LinkProps {
  path? :string;
  activeClassName?: string,
  activeStyle?: object,
  isActive?: (match: boolean | RouteObject, route: RouteObject, props: NavLinkProps) => boolean,
}
