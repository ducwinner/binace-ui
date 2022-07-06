import AxiosNews from "./AxiosNewsApi";

const NewsApi = {
  get() {
    return AxiosNews.get();
  },
};

export default NewsApi;
