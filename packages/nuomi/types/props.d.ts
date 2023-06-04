import { CSSProperties } from 'react';
import { RouteObject } from './router';
import { NuomiStore } from './store';

export interface NuomiReducers<S = any> {
  [key: string]: (state: S, payload?: any) => any;
}

export interface NuomiEffects<S = any> {
  [key: string]: (store: NuomiStore<S>, payload?: any) => any;
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

export interface NuomiProps<S = any> {
  id?: string;
  state?: S;
  reducers?: NuomiReducers<S>;
  effects?: NuomiEffects<S>;
  async?: (cb?: (props: any) => void) => any;
  render?: (props: Props<S>) => any;
  onInit?: (props: Props<S>) => any;
  children?: any;
  [key: string]: any;
}

export interface RouteProps<S = any> extends NuomiProps<S> {
  path?: string;
  cache?: boolean | 'state';
  reload?: boolean;
  onEnter?: (enter: () => void) => boolean;
  onShow?: (props: Props<S>) => any;
  onActivte?: (props: Props<S>) => any;
  onLeave?: (leave: () => void, to: RouteObject) => boolean;
}

export interface NuomiRouteProps<S = any> extends NuomiProps<S> {
  pathPrefix?: string | RegExp;
  path?: string;
}

export type Props<S = any> = RouteProps<S> & NuomiRouteProps<S> & {
  store?: NuomiStore<S>;
  route?: RouteObject;
}

export interface ShapeRouteObject extends RouteProps {
  children?: ShapeRouteObject[];
}

export interface ShapeRouteProps {
  routes: ShapeRouteObject[];
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
  className?: string;
  style?: CSSProperties;
}

export interface NavLinkProps extends LinkProps {
  path? :string;
  activeClassName?: string,
  activeStyle?: object,
  isActive?: (match: boolean | RouteObject, route: RouteObject, props: NavLinkProps) => boolean,
}
