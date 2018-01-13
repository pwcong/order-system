import axios from 'axios';

const HEADERS = {};

export default function(url, method = 'GET', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      data,
      headers: Object.assign({}, HEADERS, headers)
    })
      .then(res => {
        if (res.status === 200 && res.data && res.data.code === 20000) {
          resolve(res);
        } else {
          reject(res.msg || (res.data && res.data.message));
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
