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
  wrapper?: boolean;
  reload?: boolean;
  readonly location?: object;
  onEnter?: (enter: () => void) => boolean;
  onChange?: () => void;
  onLeave?: (leave: () => void) => boolean;
}

export interface NuomiRouteProps extends Props {
  pathPrefix?: string;
}

export interface NuomiProps extends RouteProps, NuomiRouteProps {}
