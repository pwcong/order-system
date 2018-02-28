'use strict';

const Service = require('egg').Service;

const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

class UserService extends Service {
  async register(username, password, type, parent_id = null) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      /************ 开启事务 ************/
      const t = await app.model.transaction();

      try {
        let _user = null;

        _user = await app.model.User.findByUsername(username);

        if (_user) {
          throw new Error('用户已存在');
        }

        const salt = uuidv1();

        _user = await app.model.User.create(
          {
            username,
            password: uuidv5(password, salt),
            password_salt: salt,
            type,
            parent_id
          },
          {
            transaction: t
          }
        );

        if (!_user) {
          throw new Error('用户创建失败');
        }

        const _userInfo = await app.model.UserInfo.create(
          {
            id: _user.id,
            nickname: _user.username
          },
          {
            transaction: t
          }
        );

        if (!_userInfo) {
          throw new Error('用户信息创建失败');
        }

        const _userSecret = await app.model.UserSecret.create(
          {
            id: _user.id
          },
          {
            transaction: t
          }
        );

        if (!_userSecret) {
          throw new Error('用户私密创建失败');
        }

        await t.commit();

        const __user = await app.model.User.findByUsername(username);

        if (!__user) {
          throw new Error('用户注册失败');
        }

        resolve({
          user: __user
        });
      } catch (err) {
        await t.rollback();

        reject({
          message: err.message
        });
      }
    });
  }

  async login(username, pwd) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _user = null;

        _user = await app.model.User.findByUsername(username);

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
          user: _user
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async searchById(id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _user = null;

        _user = await app.model.User.findOne({
          where: {
            id
          },
          include: [
            {
              model: app.model.UserInfo,
              as: 'user_info'
            },
            {
              model: app.model.UserSecret,
              as: 'user_secret'
            }
          ]
        });

        if (!_user) {
          throw new Error('用户不存在');
        }

        resolve({
          user: _user
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async searchByIdWithType(id, type) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _user = null;

        _user = await app.model.User.findOne({
          where: {
            id,
            type
          },
          include: [
            {
              model: app.model.UserInfo,
              as: 'user_info'
            },
            {
              model: app.model.UserSecret,
              as: 'user_secret'
            }
          ]
        });

        if (!_user) {
          throw new Error('用户不存在');
        }

        resolve({
          user: _user
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async searchByParentId(parent_id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _users = null;

        _users = await app.model.User.findAll({
          where: {
            parent_id
          },
          include: [
            {
              model: app.model.UserInfo,
              as: 'user_info'
            },
            {
              model: app.model.UserSecret,
              as: 'user_secret'
            }
          ]
        });

        resolve({
          users: _users
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async modifyPWD(id, password) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _user = null;

        _user = await app.model.User.findOne({
          where: {
            id
          },
          include: [
            {
              model: app.model.UserInfo,
              as: 'user_info'
            }
          ]
        });

        if (!_user) {
          throw new Error('用户不存在');
        }

        const salt = uuidv1();

        _user.password = uuidv5(password, salt);
        _user.password_salt = salt;

        await _user.save();

        resolve({
          user: _user
        });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  async recharge(id, amount) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      /************ 开启事务 ************/
      const t = await app.model.transaction();

      try {
        const _user = await app.model.User.findById(id);
        if (!_user || _user.status !== 0) {
          throw new Error('充值账户无效');
        }

        /************ 更新充值账户 ************/
        const rechargeAmount = parseFloat(amount);
        const userBalance = parseFloat(_user.balance);

        _user.balance = userBalance + rechargeAmount;
        await _user.save({ transaction: t });

        /** ********** 新建充值账单 ************/

        await app.model.Bill.create(
          {
            user_id: id,
            name: '充值',
            amount: rechargeAmount,
            type: 0
          },
          { transaction: t }
        );

        await t.commit();

        resolve({});
      } catch (err) {
        await t.rollback();

        reject({
          message: err.message
        });
      }
    });
  }

  async lock(id, parent_id) {
    return this.changeStatus(id, parent_id, 1);
  }

  async unlock(id, parent_id) {
    return this.changeStatus(id, parent_id, 0);
  }

  async remove(id, parent_id) {
    return this.changeStatus(id, parent_id, 2);
  }

  async changeStatus(id, parent_id = null, status) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _user = null;

        const condition = {
          id
        };

        if (parent_id) {
          condition.parent_id = parent_id;
        }

        _user = await app.model.User.findOne({
          where: condition
        });

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
