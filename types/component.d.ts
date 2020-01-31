import  { PureComponent, ComponentType } from 'react';
import { Props, RouteProps, NuomiRouteProps } from './props';

export interface RouterProps {
  hashPrefix?: string,
}

export interface RedirectProps {
  from?: string,
  to?: string,
  reload?: boolean,
}

export interface LinkProps {
  to?: string,
  reload?: boolean,
}

interface MapStateToProps {}

export interface Connect {
  (): <P>(Component: ComponentType<P>) => ComponentType<P>,
}

export class Nuomi extends PureComponent<Props> {}

export class Route extends PureComponent<RouteProps> {}

export class NuomiRoute extends PureComponent<NuomiRouteProps> {}

export class Router extends PureComponent<RouterProps> {}

export class Redirect extends PureComponent<RedirectProps> {}

export class Link extends PureComponent<LinkProps> {}

export const connect: Connect;

export function withNuomi<P>(Component: ComponentType<P>): ComponentType<P>;