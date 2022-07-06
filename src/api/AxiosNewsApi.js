import axios from "axios";

const api_news = "https://crypto-pulse.p.rapidapi.com/news";
const AxiosNews = axios.create({
  baseURL: api_news,
  headers: {
    "X-RapidAPI-Key": "8d19e2eeb4mshbd696b8375d3aaep123bc3jsn8a7183029efb",
    "X-RapidAPI-Host": "crypto-pulse.p.rapidapi.com",
  },
});

AxiosNews.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosNews.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default AxiosNews;
