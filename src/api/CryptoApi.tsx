import axiosClient from './AxiosApi';

interface paramsInterface {
  per_page: Number;
  order: string;
}

const CryptoApi = {
  getAll(params: paramsInterface) {
    const url = '/';
    return axiosClient.get(url, { params });
  },

  get(params: string) {
    const url = '';
    return axiosClient.get(url, { params });
  },

  add(data: string) {
    const url = `/`;
    return axiosClient.post(url, data);
  },

  update(data: any) {
    const url = `/${data.id}`;
    return axiosClient.post(url, data);
  },

  remove(id: string) {
    const url = `/${id}`;
    return axiosClient.delete(url);
  },
};

export default CryptoApi;
