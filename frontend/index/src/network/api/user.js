import request from '../request';

import api from './api';

function login(upe, password) {
  return request(api.user.login.url(), api.user.login.method, api.user.login.data(upe, password));
}

export default {
  login
};
