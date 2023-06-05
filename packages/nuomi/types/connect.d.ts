export interface ConnectGetState<S = any> {
  (state: S, globalState: any): S;
}
