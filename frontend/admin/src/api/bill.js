import request from '@/utils/request';

export function getBills(type = [], filter = '', pageSize = '', pageNo = '') {
  return request({
    url: `/bills/${filter}?pageSize=${pageSize}&pageNo=${pageNo}`,
    method: 'post',
    data: {
      type
    }
  });
}

export function getTodayBills(type, pageSize, pageNo) {
  return request({
    url: `/bills/today`,
    method: 'post',
    data: {
      type
    }
  });
}

export function getYearBills(type, year) {
  return request({
    url: `/bills/${year}`,
    method: 'post',
    data: {
      type
    }
  });
}
