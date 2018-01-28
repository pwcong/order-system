'use strict';

const Service = require('egg').Service;

class UserInfoService extends Service {
  /**
   * 获取用户信息
   * @param {int} id 用户ID
   */
  async queryById(id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _user = null;

        _user = await app.model.User.findById(id);
        if (!_user) {
          throw new Error('用户不存在');
        }

        let _userInfo = null;
        _userInfo = await app.model.UserInfo.findOrCreate({
          where: {
            id
          },
          defaults: {
            id
          }
        });

        if (!_userInfo[0]) {
          throw new Error('用户信息不存在');
        }

        resolve({ userInfo: _userInfo[0] });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  /**
   * 修改个人信息
   * @param {int} id 用户ID
   * @param {object} newUserInfo 用户信息
   */
  async modifySelf(id, newUserInfo) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      try {
        let _userInfo = null;

        _userInfo = await app.model.UserInfo.findById(id);

        if (!_userInfo) {
          throw new Error('用户信息不存在');
        }

        const editable = {
          nickname: true,
          birthday: true,
          sex: true,
          address: true,
          intro: true,
          avatar: true
        };

        Object.keys(newUserInfo).forEach((key, idx) => {
          if (editable[key]) {
            _userInfo[key] = newUserInfo[key];
          }
        });

        await _userInfo.save();

        resolve({ userInfo: _userInfo });
      } catch (err) {
        reject({
          message: err.message
        });
      }
    });
  }

  /**
   * 修改其他用户信息
   * @param {int} srcId 修改用户ID
   * @param {int} dstId 被修改用户ID
   */
  async modifyOther(srcId, dstId) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      resolve();
    });
  }
}

module.exports = UserInfoService;
