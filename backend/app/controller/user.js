'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 注册用户
   */
  async register() {}

  /**
   * 登录用户
   */
  async login() {}

  /**
   * 锁定用户
   */
  async lock() {}

  /**
   * 解锁用户
   */
  async unlock() {}
}
module.exports = UserController;
