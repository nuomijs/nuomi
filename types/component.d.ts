import  { PureComponent, ComponentType } from 'react';
import { Props, RouteProps, NuomiRouteProps } from './props';

export interface RouterProps {
  hashPrefix?: string,
}

export interface RedirectProps {
  from?: string,
  to?: string | object,
  reload?: boolean,
}

export interface LinkProps {
  to?: string | object,
  reload?: boolean,
}

export interface Connect {
  (): <P>(Component: ComponentType<P>) => ComponentType<P>,
}

export class Nuomi<P extends Props> extends PureComponent<P, any> {}

export class Route<P extends RouteProps> extends PureComponent<P, any> {}

export class NuomiRoute<P extends NuomiRouteProps> extends PureComponent<P, any> {}

export class Router<P extends RouterProps> extends PureComponent<P, any> {}

export class Redirect<P extends RedirectProps> extends PureComponent<P, any> {}

export class Link<P extends LinkProps> extends PureComponent<P, any> {}

export const connect: Connect;

export function withNuomi<P>(Component: ComponentType<P>): ComponentType<P>;
