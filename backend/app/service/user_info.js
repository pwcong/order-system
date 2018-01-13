'use strict';

const Service = require('egg').Service;

class UserInfoService extends Service {
  async get(id) {
    const { app } = this;

    return new Promise(async (resolve, reject) => {
      let _userInfo = null;

      _userInfo = await app.model.UserInfo.findById(id);

      if (!_userInfo) {
        reject({
          message: '用户信息不存在'
        });
        return;
      }

      resolve({ userInfo: _userInfo });
    });
  }
}

module.exports = UserInfoService;
