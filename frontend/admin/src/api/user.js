import request from '@/utils/request';

export function login(upe, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      upe,
      password
    }
  });
}

export function getInfo(id) {
  return request({
    url: `/user/info/${id}`,
    method: 'get'
  });
}

export function check() {
  return request({
    url: `/user/check`,
    method: 'get'
  });
}

export function modifyInfo(id, userInfo) {
  return request({
    url: `/user/info/${id}`,
    method: 'post',
    data: userInfo
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
