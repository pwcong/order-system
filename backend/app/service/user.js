'use strict';

const Service = require('egg').Service;

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

class UserService extends Service {
  async register(username, password, phone, type) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _user = null;

        _user = await app.model.User.findByUsername(username);

        if (_user) {
          throw new Error('用户已存在');
        }

        _user = await app.model.User.findByPhone(phone);

        if (_user) {
          throw new Error('手机号已存在');
        }

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
          message: err.message
        });
      }
    });
  }

  async login(upe, pwd) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _user = null;

        _user = await app.model.User.findByUPE(upe);

        if (!_user) {
          throw new Error('用户不存在');
        }

        if (uuidv5(pwd, _user.password_salt) !== _user.password) {
          throw new Error('密码错误');
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
          throw new Error(message);
        }

        resolve({
          id: _user.id,
          type: _user.type
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
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
      try {
        let _user = null;

        _user = await app.model.User.findById(id);

        if (!_user) {
          throw new Error('用户不存在');
        }

        _user.status = status;

        await _user.save();
        resolve();
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }
}

module.exports = UserService;
