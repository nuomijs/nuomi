export default typeof window !== 'undefined'
  ? window
  : {
      Proxy: global.Proxy,
      location: {},
    };
