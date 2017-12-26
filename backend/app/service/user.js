'use strict';

const Service = require('egg').Service;

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

class UserService extends Service {
  async register(username, password, phone, type) {
    const { app } = this;

    let _user = null;

    _user = await app.model.User.findByUsername(username);

    if (_user) {
      return {
        success: false,
        message: '用户已存在',
        payload: {}
      };
    }

    _user = await app.model.User.findByPhone(phone);

    if (_user) {
      return {
        success: false,
        message: '手机号已存在',
        payload: {}
      };
    }

    const salt = uuidv1();

    _user = await app.model.User.create({
      username,
      phone,
      password: uuidv5(password, salt),
      password_salt: salt,
      type
    });

    if (_user) {
      return {
        success: true,
        message: '',
        payload: {
          id: _user.id,
          type
        }
      };
    }

    return {
      success: false,
      message: '未知错误'
    };
  }

  async login(upe, password) {}
}

module.exports = UserService;
