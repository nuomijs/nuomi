import { CSSProperties } from 'react';
import { Location } from './router';
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
  name?: string;
  cache?: boolean | 'state';
  reload?: boolean;
  onEnter?: (enter: () => void) => boolean;
  onShow?: (props: Props<S>) => any;
  onActivte?: (props: Props<S>) => any;
  onLeave?: (leave: () => void, to: Location) => boolean;
}

export interface DefineNuomiProps<S = any> extends RouteProps<S> {
  store?: NuomiStore<S>;
  location?: Location;
}

export type Props<S = any> = {
  state: S,
  store: NuomiStore<S>;
  location: Location;
  children: any,
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
  path? :string;
  activeClassName?: string,
  activeStyle?: CSSProperties,
  isActive?: (match: boolean | Location, location: Location, props: NavLinkProps) => boolean,
}
