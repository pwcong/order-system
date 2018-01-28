import request from '@/utils/request';

export function getTodayOrders(status = []) {
  return request({
    url: '/orders/received/today',
    method: 'post',
    data: {
      status
    }
  });
}
