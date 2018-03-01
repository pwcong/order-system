import request from '@/utils/request';

export function registerBusinesses(username, password, userInfo) {
  return request({
    url: `/user/business/register`,
    method: 'post',
    data: {
      username,
      password,
      userInfo
    }
  });
}

export function queryBusinesses(id, pageSize = '', pageNo = '') {
  return request({
    url: `/user/businesses/${id}?pageSize=${pageSize}&pageNo=${pageNo}`,
    method: 'get'
  });
}

export function lockBusinesses(id) {
  return request({
    url: `/user/business/lock/${id}`,
    method: 'post'
  });
}
export function unlockBusinesses(id) {
  return request({
    url: `/user/business/unlock/${id}`,
    method: 'post'
  });
}
export function removeBusinesses(id) {
  return request({
    url: `/user/business/remove/${id}`,
    method: 'post'
  });
}
