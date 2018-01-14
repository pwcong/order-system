'use strict';

const Service = require('egg').Service;

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

class UserService extends Service {
  async register(username, password, phone, type) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      let _user = null;

      _user = await app.model.User.findByUsername(username);

      if (_user) {
        reject({
          message: '用户已存在'
        });
        return;
      }

      _user = await app.model.User.findByPhone(phone);

      if (_user) {
        reject({
          message: '手机号已存在'
        });
        return;
      }

      try {
        const userInfo = await app.model.transaction(t => {
          const salt = uuidv1();
          return app.model.User.create(
            {
              username,
              phone,
              password: uuidv5(password, salt),
              password_salt: salt,
              type
            },
            {
              transaction: t
            }
          ).then(user => {
            return app.model.UserInfo.create(
              {
                id: user.id
              },
              {
                transaction: t
              }
            );
          });
        });

        resolve({
          id: userInfo.id
        });
      } catch (err) {
        reject({
          message: '未知错误'
        });
      }
    });
  }

  async login(upe, pwd) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      let _user = null;

      _user = await app.model.User.findByUPE(upe);

      if (!_user) {
        reject({
          message: '用户不存在'
        });
        return;
      }

      if (uuidv5(pwd, _user['password_salt']) != _user['password']) {
        reject({
          message: '密码错误'
        });
        return;
      }

      if (_user.status !== 0) {
        let message = null;

        switch (_user.status) {
          case 1:
            message = '该账户已被锁定';
            break;
          case 2:
            message = '该账户已被注销';
            break;
          default:
            message = '该账户不可用';
            break;
        }

        reject({
          message
        });
        return;
      }

      resolve({
        id: _user.id,
        type: _user.type
      });
    });
  }

  async lock(id) {
    return this.changeStatus(id, 1);
  }

  async unlock(id) {
    return this.changeStatus(id, 0);
  }

  async remove(id) {
    return this.changeStatus(id, 2);
  }

  async changeStatus(id, status) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      let _user = null;

      _user = await app.model.User.findById(id);

      if (!_user) {
        reject({
          message: '用户不存在'
        });
        return;
      }

      _user.status = status;

      try {
        await _user.save();
        resolve();
      } catch (err) {
        reject({
          message: '操作失败'
        });
      }
    });
  }
}

module.exports = UserService;
