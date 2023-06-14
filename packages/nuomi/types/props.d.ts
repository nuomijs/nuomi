import { CSSProperties } from 'react';
import { Location } from './router';
import { NuomiStore } from './store';

export interface NuomiReducer<S = any> {
  [key: string]: (state: S, payload?: any) => any;
}

export interface NuomiAction<S = any, G = any> {
  [key: string]: (store: NuomiStore<S, G>, payload?: any) => any;
}

export interface NuomiGetter<S = any> {
  [key: string]: (state: S) => any;
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

export interface NuomiProps<S = any, G = any> {
  id?: string;
  state?: S;
  reducer?: NuomiReducer<S>;
  action?: NuomiAction<S, G>;
  getter?: NuomiGetter<S>;
  extends?: NuomiProps[];
  load?: (cb?: (props: any) => void) => any;
  render?: (props: Props<S, G> & { children: any }) => any;
  onInit?: (props: Props<S, G>) => any;
  children?: any;
  [key: string]: any;
}

export interface NuomiRouteProps<S = any, G = any> extends NuomiProps<S, G> {
  path?: string;
}

export interface RouteProps<S = any, G = any> extends NuomiProps<S, G> {
  path?: string;
  name?: string;
  cache?: boolean | 'state';
  reload?: boolean;
  extends?: RouteProps[];
  onEnter?: (enter: () => void) => boolean;
  onShow?: (props: Props<S, G>) => any;
  onActivte?: (props: Props<S, G>) => any;
  onLeave?: (leave: () => void, to: Location) => boolean;
}

export interface DefineProps<S = any, G = any> extends RouteProps<S, G> {
  extends?: DefineProps[];
  store?: NuomiStore<S, G>;
  location?: Location;
  parent?: Props;
}

export type Props<S = any, G = any> = {
  store: NuomiStore<S, G>;
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
