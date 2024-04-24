export interface ConnectGetState<S = any, G = any> {
  (state: S & G, globalState: any): any;
}
