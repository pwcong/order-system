import request from '@/utils/request';

export function getOrders(status = [], pageSize = '', pageNo = '', filter = '') {
  return request({
    url: `/orders/received/${filter}?pageSize=${pageSize}&pageNo=${pageNo}`,
    method: 'post',
    data: {
      status
    }
  });
}

export function getTodayOrders(status = []) {
  return request({
    url: `/orders/received/today`,
    method: 'post',
    data: {
      status
    }
  });
}

export function confirmOrder(id) {
  return request({
    url: `/order/confirm/${id}`,
    method: 'post'
  });
}

export function closeOrder(id) {
  return request({
    url: `/order/close/${id}`,
    method: 'post'
  });
}
