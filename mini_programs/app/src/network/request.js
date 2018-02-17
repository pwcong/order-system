import wepy from 'wepy';

const HEADER = {};

export default function(url, method = 'GET', header = {}, data = {}) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url,
      data,
      header: Object.assign({}, HEADER, header),
      method,
      dataType: 'json',
      success(res) {
        if (res.statusCode === 200 && res.data && res.data.code === 20000) {
          resolve(res.data);
        } else if (res.statusCode === 200 && res.data) {
          reject({
            message: res.data.message
          });
        } else {
          reject({
            message: res.errMsg
          });
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
