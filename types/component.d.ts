import { PureComponent, ComponentType } from 'react';
import { Props, RouteProps, NuomiRouteProps } from './props';

interface BaseRouter {
  basename?: string;
  context?: object;
}

export interface RouterProps extends BaseRouter {
  type?: 'hash' | 'browser';
}

export interface StaticRouterProps extends BaseRouter {
  location?: string | object;
}

export interface RedirectProps {
  from?: string;
  to?: string | object;
  reload?: boolean;
}

export interface LinkProps {
  to?: string | object;
  reload?: boolean;
}

export interface Connect {
  (): <P>(Component: ComponentType<P>) => ComponentType<P>;
}

export class Nuomi<P extends Props> extends PureComponent<P, any> {}

export class Route<P extends RouteProps> extends PureComponent<P, any> {}

export class NuomiRoute<P extends NuomiRouteProps> extends PureComponent<P, any> {}

export class Router<P extends RouterProps> extends PureComponent<P, any> {}

export class Router<P extends StaticRouterProps> extends PureComponent<P, any> {}

export class Redirect<P extends RedirectProps> extends PureComponent<P, any> {}

export class Link<P extends LinkProps> extends PureComponent<P, any> {}

export class NavLink<P extends LinkProps> extends PureComponent<P, any> {}

export const connect: Connect;

export function withNuomi<P>(Component: ComponentType<P>): ComponentType<P>;
