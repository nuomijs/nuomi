import { PureComponent, ComponentType } from 'react';
import { Props, NuomiProps, RouteProps, ShapeRouteProps, RouterProps, StaticRouterProps, RedirectProps, LinkProps, NavLinkProps } from './props';
import { ConnectGetState } from './connect';
import { NuomiStoreDispatch } from './store';

export interface Connect<S = any> {
  (getState?: ConnectGetState<S>, getDispatch?: NuomiStoreDispatch, options?: { withRef: boolean }): <P>(Component: ComponentType<P>) => ComponentType<P>;
}

export class Nuomi<P extends NuomiProps> extends PureComponent<P, any> {
  render(): any;
}

export class Route<P extends RouteProps> extends PureComponent<P, any> {
  render(): any;
}

export class ShapeRoute<P extends ShapeRouteProps> extends PureComponent<P, any> {
  render(): any;
}

export class Router<P extends RouterProps> extends PureComponent<P, any> {
  render(): any;
}

export class StaticRouter<P extends StaticRouterProps> extends PureComponent<P, any> {
  render(): any;
}

export class Redirect<P extends RedirectProps> extends PureComponent<P, any> {
  render(): any;
}

export class Link<P extends LinkProps> extends PureComponent<P, any> {
  render(): any;
}

export class NavLink<P extends NavLinkProps> extends PureComponent<P, any> {
  render(): any;
}

export const connect: Connect;

export function withNuomi<P extends { nuomi: Props }>(Component: ComponentType<P>): ComponentType<P>;
