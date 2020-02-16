import { Location } from './router';

export interface Props {
  id?: string;
  state?: object;
  data?: object;
  reducers?: object;
  effects?: object;
  readonly store?: object;
  async?: (loadProps: (props: NuomiProps) => void) => void;
  render?: () => any;
  onInit?: () => any;
}

export interface RouteProps extends Props {
  path?: string;
  cache?: boolean | 'state';
  reload?: boolean;
  readonly location?: Location;
  onEnter?: (enter: () => void) => boolean;
  onChange?: () => void;
  onChange?: object;
  onLeave?: (leave: () => void, to: Location) => boolean;
}

export interface NuomiRouteProps extends Props {
  pathPrefix?: string | RegExp;
  path?: string;
}

export interface NuomiProps extends RouteProps, NuomiRouteProps {}
