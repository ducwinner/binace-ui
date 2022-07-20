import axios from 'axios';
const authAxios = axios.create({
  baseURL: 'http://localhost:5555/api/login',
  headers: { 'content-type': 'application/json'}
});

authAxios.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    return config;
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  }
);



// Add a response interceptor
authAxios.interceptors.response.use(
  function (response: any) {
    setTimeout(function () {}, 1000);
    return response.data;
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);


export default authAxios;