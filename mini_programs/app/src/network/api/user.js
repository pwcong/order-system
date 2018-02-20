import request from '../request';

import { BASE_API } from '@/const/config';

export function searchBusiness(id) {
  return request(`${BASE_API}/user/business/${id}`, 'GET');
}

export function register(username, password) {
  return request(
    `${BASE_API}/user/register`,
    'POST',
    {},
    {
      username,
      password,
      type: 1
    }
  );
}

export function login(username, password) {
  return request(
    `${BASE_API}/user/login`,
    'POST',
    {},
    {
      username,
      password
    }
  );
}

export function check(token) {
  return request(
    `${BASE_API}/user/login`,
    'POST',
    {
      'X-Token': token
    },
    {}
  );
}

export function modifyPWD(token, password) {
  return request(
    `${BASE_API}/user/modify/password`,
    'POST',
    {
      'X-Token': token
    },
    {
      password
    }
  );
}
