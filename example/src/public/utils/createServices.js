export default (requests = {}) => {
  const services = {};
  for (const i in requests) {
    if (requests[i]) {
      const req = requests[i];
      if (typeof req === 'function') {
        services[i] = (data = {}, options = {}) => new Promise((resolve, reject) => {
          setTimeout(() => {
            const res = req(data);
            if (res.status === 200) {
              resolve(res.data);
            } else {
              reject(res);
            }
          }, options.delay || 500);
        });
      }
    }
  }
  return services;
};
