import { PureComponent, ComponentType } from 'react';
import { Props, RouteProps, NuomiRouteProps } from './props';
import { Location } from './router';
import { ConnectGetState, ConnectGetDispatch } from './connect';

export interface ShapeRouteProps {
  routes: object[];
}

export interface RouterProps {
  basename?: string;
  type?: 'hash' | 'browser';
}

export interface StaticRouterProps {
  basename?: string;
  location?: string | Location;
  context?: object;
}

export interface RedirectProps {
  from?: string;
  to?: string | Location;
  reload?: boolean;
}

export interface LinkProps {
  to?: string | Location;
  replace?: boolean;
  reload?: boolean;
}

export interface NavLinkProps extends LinkProps {
  path? :string;
  activeClassName?: string,
  activeStyle?: object,
  isActice?: (match: boolean | Location, location: Location, props: NavLinkProps) => boolean,
}

export interface Connect {
  (getState?: ConnectGetState, getDispatch?: ConnectGetDispatch, options?: { withRef: boolean }): <P>(Component: ComponentType<P>) => ComponentType<P>;
}

export class Nuomi<P extends Props> extends PureComponent<P, any> {}

export class Route<P extends RouteProps> extends PureComponent<P, any> {}

export class NuomiRoute<P extends NuomiRouteProps> extends PureComponent<P, any> {}

export class ShapeRoute<P extends ShapeRouteProps> extends PureComponent<P, any> {}

export class Router<P extends RouterProps> extends PureComponent<P, any> {}

export class StaticRouter<P extends StaticRouterProps> extends PureComponent<P, any> {}

export class Redirect<P extends RedirectProps> extends PureComponent<P, any> {}

export class Link<P extends LinkProps> extends PureComponent<P, any> {}

export class NavLink<P extends NavLinkProps> extends PureComponent<P, any> {}

export const connect: Connect;

export function withNuomi<P>(Component: ComponentType<P>): ComponentType<P>;
