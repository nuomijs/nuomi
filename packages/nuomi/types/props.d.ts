import { CSSProperties } from 'react';
import { Location } from './router';
import { NuomiStore } from './store';

export interface NuomiReducer<S = any> {
  [key: string]: (state: S, payload?: any) => any;
}

export interface NuomiAction<S = any> {
  [key: string]: (payload?: any, store?: NuomiStore<S>) => any;
}

export type RoutePropValue = {
  pathname?: string;
  url?: string;
  search?: string;
  hash?: string;
  path?: string;
  name?: string;
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
  reducer?: NuomiReducer<S>;
  action?: NuomiAction<S>;
  extends?: NuomiProps<S>[];
  load?: (cb?: (props: any) => void) => any;
  render?: (props: Props<S> & { children: any }) => any;
  onInit?: (props: Props<S>) => any;
  children?: any;
  [key: string]: any;
}

export interface NuomiRouteProps<S = any> extends NuomiProps<S> {
  path?: string;
}

export interface RouteProps<S = any> extends NuomiProps<S> {
  path?: string;
  name?: string;
  cache?: boolean | 'state';
  reload?: boolean;
  extends?: RouteProps<S>[];
  onEnter?: (enter: () => void) => boolean;
  onShow?: (props: Props<S>) => any;
  onActivte?: (props: Props<S>) => any;
  onLeave?: (leave: () => void, to: Location) => boolean;
}

export interface DefineProps<S = any> extends RouteProps<S> {
  extends?: DefineProps<S>[];
  store?: NuomiStore<S>;
  location?: Location;
  parent?: Props;
}

export type Props<S = any> = {
  store: NuomiStore<S>;
  location: Location;
  parent?: Props;
}

export interface ShapeRouteObject extends RouteProps {
  route?: boolean;
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
  location?: string | RoutePropValue;
  context?: any;
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
  activeClassName?: string,
  activeStyle?: CSSProperties,
  isActive?: (match: boolean | Location, location: Location, props: NavLinkProps) => boolean,
}
