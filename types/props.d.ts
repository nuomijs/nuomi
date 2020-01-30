export interface Props {
  id?: String,
  state?: Object,
  data?: Object,
  reducers?: Object,
  effects?: Object,
  async?: Function,
  render?: Function,
  onInit?: Function,
}

export interface RouteProps extends Props {
  path?: String,
  wrapper?: Boolean,
  reload?: Boolean,
  onEnter?: Function,
  onChange?: Function,
  onLeave?: Function,
}

export interface NuomiRouteProps extends Props {
  pathPrefix?: String,
}

export interface NuomiProps extends RouteProps, NuomiRouteProps {}