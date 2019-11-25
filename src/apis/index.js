import axios from 'axios';

const refreshCodes = [401];
let isRefreshing = false;
let failedQueue = [];

const request = axios.create();

request.interceptors.request.use(
  config => {
    config.withCredentials = true;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

request.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    const originalRequest = error.config;
    let refresh = 1;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
            failedQueue.push({
              resolve,
              reject
            });
          })
          .then(() => {
            return axios(originalRequest);
          })
          .catch(err => {
            return err;
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      refresh += 1;
    } else if (error.response.status === 500) {
      axios.defaults.retry = 1;
      const backoff = new Promise(function (resolve) {
        resolve();
      });
      return backoff.then(function () {
        return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default request;