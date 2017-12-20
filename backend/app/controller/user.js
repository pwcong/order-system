'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 注册客户
   */
  async registerCustomer() {}

  /**
   * 注册商户
   */
  async registerBusiness() {}

  /**
   * 注册企业
   */
  async registerEnterprise() {}

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
