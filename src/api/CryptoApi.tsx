import axiosClient from './AxiosApi';

interface paramsInterface {
  per_page?: Number;
  order?: string;
  ids?: string;
}

const CryptoApi = {
  getAll(params: paramsInterface) {
    const url = '/';
    return axiosClient.get(url, { params });
  },

  get(params: paramsInterface) {
    const url = '';
    return axiosClient.get(url, { params });
  },

  add(data: paramsInterface) {
    const url = `/`;
    return axiosClient.post(url, data);
  },

  update(data: any) {
    const url = `/${data.id}`;
    return axiosClient.post(url, data);
  },

  remove(id: paramsInterface) {
    const url = `/${id}`;
    return axiosClient.delete(url);
  },
};

export default CryptoApi;
