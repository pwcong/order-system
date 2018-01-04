'use strict';

const CODE = {
  // 一般http状态码
  STATUS_OK: 200,
  STATUS_ERROR: 400,
  // 一般错误状态码
  TOKEN_NEEDED: 40001,
  TOKEN_EXPIRED: 40002,
  TOKEN_ERROR: 40003,
  USERTYPE_MISMATCH: 40101,
  // 服务器错误状态码
  SERVER_ERROR: 50000
};

module.exports = {
  get code() {
    return CODE;
  }
};
