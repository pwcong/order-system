import request from '@/utils/request';

export function getOrders(status = [], filter = '', pageSize = '', pageNo = '') {
  return request({
    url: `/orders/received/${filter}?pageSize=${pageSize}&pageNo=${pageNo}`,
    method: 'post',
    data: {
      status
    }
  });
}

export function getTodayOrders(status, pageSize, pageNo) {
  return getOrders(status, 'today', pageSize, pageNo);
}
