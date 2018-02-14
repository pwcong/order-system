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

export function modifyInfo(userInfo) {
  return request({
    url: '/user/info',
    method: 'post',
    data: userInfo
  });
}

export function check() {
  return request({
    url: `/user/check`,
    method: 'post'
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
