import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.nftport.xyz/v0/nfts',
  params: { chain: 'ethereum' },
  headers: { 'Content-Type': 'application/json', Authorization: '' },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
