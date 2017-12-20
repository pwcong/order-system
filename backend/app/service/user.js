'use strict';

const Service = require('egg').Service;

const uuidv1 = require('uuid/v1');

class UserService extends Service {
  async register(username, phone, password, type) {}

  async login(upe, password) {}
}

module.exports = UserService;
