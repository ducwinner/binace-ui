import axios from 'axios';
const api_get_coins_market =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y';
const axiosListCoin = axios.create({
  baseURL: api_get_coins_market,
  headers: { 'Content-type': 'aplication/json' },
});

axiosListCoin.interceptors.request.use(
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
axiosListCoin.interceptors.response.use(
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

export default axiosListCoin;
