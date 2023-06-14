export interface ConnectGetState<S = any, G = any> {
  (state: S & { getter: G }, globalState: any): any;
}
