'use strict';

const Service = require('egg').Service;

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

class UserService extends Service {
  async register(username, phone, password, type) {
    let _user;

    _user = await this.app.model.User.findOne({
      where: {
        username
      }
    });

    if (_user) {
      return {
        success: false,
        message: '用户已存在',
        payload: {}
      };
    }

    _user = await this.app.model.User.findOne({
      where: {
        phone
      }
    });

    if (_user) {
      return {
        success: false,
        message: '手机号已存在',
        payload: {}
      };
    }

    const salt = uuidv1();

    const user = await this.app.model.User.create({
      username,
      phone,
      password: uuidv5(password, salt),
      password_salt: salt,
      type
    });

    return {
      success: true,
      message: '',
      payload: {
        id: user.id,
        type
      }
    };
  }

  async login(upe, password) {}
}

module.exports = UserService;
