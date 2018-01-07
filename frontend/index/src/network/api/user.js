import request from '../request';

import api from './api';

function login(upe, password) {
  return request(api.user.login.url(), api.user.login.method, api.user.login.data(upe, password));
}

function register(username, phone, password, type) {
  return request(
    api.user.register.url(),
    api.user.register.method,
    api.user.register.data(username, phone, password, type)
  );
}

export default {
  login,
  register
};
