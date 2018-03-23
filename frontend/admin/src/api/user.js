import request from '@/utils/request';

export function login(upe, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username: upe,
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

export function modifyPWD(password) {
  return request({
    url: '/user/modify/password',
    method: 'post',
    data: {
      password
    }
  });
}

export function modifyBusinessPWD(id, password) {
  return request({
    url: `/user/business/modify/password/${id}`,
    method: 'post',
    data: {
      password
    }
  });
}
