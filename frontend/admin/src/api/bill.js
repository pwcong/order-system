import request from '@/utils/request';

export function getTodayBills(type = []) {
  return request({
    url: '/bills/today',
    method: 'post',
    data: {
      type
    }
  });
}
