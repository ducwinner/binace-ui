import axiosListCoin from './AxiosApi';

interface paramsInterface {
  per_page?: Number;
  order?: string;
  ids?: string;
}

const CryptoApi = {
  getAll(params: paramsInterface) {
    const url = '/';
    return axiosListCoin.get(url, { params });
  },

  get(params: paramsInterface) {
    const url = '';
    return axiosListCoin.get(url, { params });
  },

  add(data: paramsInterface) {
    const url = `/`;
    return axiosListCoin.post(url, data);
  },

  update(data: any) {
    const url = `/${data.id}`;
    return axiosListCoin.post(url, data);
  },

  remove(id: paramsInterface) {
    const url = `/${id}`;
    return axiosListCoin.delete(url);
  },
};

export default CryptoApi;
