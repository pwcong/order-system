import request from '@/utils/request';

export function queryBusinessBillStatistics(id = [], filter = '') {
  return request({
    url: `/statistics/bill/${filter}`,
    method: 'post',
    data: {
      id
    }
  });
}

export function queryBusinessOrderStatistics(id = [], filter = '') {
  return request({
    url: `/statistics/order/${filter}`,
    method: 'post',
    data: {
      id
    }
  });
}
